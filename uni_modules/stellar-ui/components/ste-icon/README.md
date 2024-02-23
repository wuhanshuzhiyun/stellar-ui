# Button 按钮
基于字体的图标集，包含了大多数常见场景的图标。

### 兼容性
#### VUE支持 
|VUE2        | VUE3        |
|---        |---        |
|√                | ×                |
#### 平台支持
|App|H5应用	|微信小程序	|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:	|:-:		|:-:		|:-:		|:-:		|:-:		|
|x	|×		|√			|×			|×			|×			|×			|


### API
#### Props
| 属性名		| 说明					|类型			|默认值		| 可选值		|
| ------		|-----------			|-----------	|-----------|-----------|
| code			|图标名称				|String			|			|			|
| color			|图标颜色				|String			|			|			|
| size			|图标大小（单位rpx）		|Number String	|28			|			|
| weight		|图标粗细				|Number String	|normal		|normal bold|
| marginLeft	|左外边距（单位rpx）		|Number String	|0			|			|
| marginRight	|右外边距（单位rpx）		|Number String	|0			|			|
| marginTop		|上外边距（单位rpx）		|Number String	|0			|			|
| marginBottom	|下外边距（单位rpx）		|Number String	|0			|			|
| text			|内嵌文字				|String			|			|			|
| textColor		|内嵌文字颜色				|String			|#fff		|			|
| textSize		|内嵌字体大小	（单位rpx）	|Number String	|24			|			|
| textWeight	|内嵌字体粗细				|String			|normal		|normal bold|


#### Events
| 属性名| 说明			|类型			|默认值		| 可选值		|说明			|
| ------| -----------	|	-----------	|-----------|-----------|	---------	|
| click	|图标点击回调事件	|Handler		|-			|-			|				|