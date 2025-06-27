export default function get_enableVue3MpClick(sensors) {
  var sa = sensors.instance;
  var _ = sa._;

  return function enableVue3MpClick() {
    // #ifdef VUE3
    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-JD ||  MP-KUAISHOU || MP-QQ || MP-LARK
    var platform;
    // #ifdef MP-WEIXIN
    platform = wx
    // #endif

    // #ifdef MP-BAIDU
    platform = swan
    // #endif

    // #ifdef MP-ALIPAY
    platform = my
    // #endif

    // #ifdef MP-TOUTIAO
    platform = tt
    // #endif

    // #ifdef MP-JD
    platform = jd
    // #endif

    // #ifdef MP-KUAISHOU
    platform = ks
    // #endif

    // #ifdef MP-QQ
    platform = qq
    // #endif

    // #ifdef MP-LARK
    platform = tt
    // #endif

    var oldCreatePage = platform.createPage;
    if (_.isFunction(oldCreatePage)) {
      platform.createPage = function (options) {
        mutateOptions(options)
        return oldCreatePage.call(platform, options);
      }
    }

    var oldCreateComponent = platform.createComponent;
    if (_.isFunction(oldCreateComponent)) {
      platform.createComponent = function (options) {
        mutateOptions(options)
        return oldCreateComponent.call(platform, options);
      }
    }

    function mutateOptions(options) {
      if (!_.isObject(options)) return;
      if (_.isFunction(options.render)) {
        var oldRender = options.render;
        options.render = function (_ctx, _cache, $props, $setup, $data, $options) {
          var instance = _ctx && _ctx.$scope;
          var bindingConfig = oldRender.call(options, _ctx, _cache, $props, $setup, $data, $options);
          addMPClick(instance, bindingConfig);
          return bindingConfig;
        }
      } else if (_.isFunction(options.setup)) {
        var oldSetup = options.setup;
        options.setup = function (_props, _defines) {
          var oldRender = oldSetup.call(options, _props, _defines);
          return function render(_ctx, _cache) {
            var instance = _ctx && _ctx.$scope;
            var bindingConfig = oldRender.call(options, _ctx, _cache);
            addMPClick(instance, bindingConfig);
            return bindingConfig;
          }
        }
      }
    }

    function addMPClick(instance, bindingConfig) {
      if (_.isObject(instance) && _.isObject(bindingConfig)) {
        var propKeys = getPropKeys(bindingConfig, [], false);
        propKeys.forEach(function (propKey) {
          var invoker = instance[propKey];
          if (_.isFunction(invoker) && _.isFunction(invoker.value) && !invoker.value.__MPClickFlag) {
            var oldValue = invoker.value;
            invoker.value = function (event) {
              if (sa.para.autoTrack && sa.para.autoTrack.mpClick) {
                clickTrack(event);
              }
              return oldValue.call(instance, event)
            }
            invoker.value.__MPClickFlag = true;
          }
        });
      }
    }

    function getPropKeys(config, dest, inner = false) {
      if (!_.isArray(dest)) dest = [];
      if (_.isArray(config)) {
        config.forEach(function (item) {
          getPropKeys(item, dest, true);
        });
      } else if (_.isObject(config)) {
        Object.values(config).forEach(function (item) {
          if (!!item) {
            if (_.isString(item) && item.startsWith('e') && (!inner || item.includes('_'))) {
              dest.push(item);
            } else if (_.isArray(item)) {
              getPropKeys(item, dest, true);
            }
          }
        });
      }
      return dest;
    }

    function clickTrack(events) {
      if (_.isUndefined(events)) events = {};
      var prop = {};
      var event_prop = _.isObject(events.event_prop) ? events.event_prop : {};
      var type = events['type'];
      var current_target = events.currentTarget || {};
      var dataset = current_target.dataset || {};

      prop['$element_id'] = current_target.id;
      prop['$element_type'] = dataset['type'];
      prop['$element_content'] = dataset['content'];
      prop['$element_name'] = dataset['name'];
      prop['$url_path'] = _.getCurrentPath();

      if (type && isClick(type)) {
        if (sa.para.preset_events && sa.para.preset_events.collect_element && sa.para.preset_events.collect_element(events) === false) {
          return false;
        }
        prop = _.extend(prop, event_prop);
        sensors.track('$MPClick', prop);
      }
    }

    function isClick(type) {
      var mp_taps = {
        tap: 1,
        longpress: 1,
        longtap: 1
      };
      return !!mp_taps[type];
    }

    // #endif
    // #endif
  }
}
