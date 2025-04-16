<template>
	<view class="test-demo">
		<view style="padding: 80rpx 80rpx">
			<ste-input border background="#fee111" :maxlength="10" showWordLimit @input="change111" />
			<ste-input border background="#fee111" type="textarea" :maxlength="10" showWordLimit />
			<input
				@input="change222"
				v-model="vvv"
				:ignoreCompositionEvent="false"
				@compositionstart="compositionstart"
				@compositionend="compositionend"
				@compositionupdate="compositionupdate"
			/>
			<view>字符长度： {{ fontSize }}</view>
			<!-- <ste-search :suggestion-list="suggestionList" @input="input1" @selectSuggestion="selectSuggestion" /> -->

			<!-- <input v-model="v1" :cursor="cursorNumber" /> -->
			<!-- <ste-button @click="click1">按钮执行</ste-button> -->
		</view>

		<ste-table :data="testRows">
			<template v-slot="{ row }">
				<ste-table-column
					label="任务名称"
					prop="taskName"
					headerAlign="center"
					align="center"
				></ste-table-column>
				<ste-table-column label="门店" prop="storeName" headerAlign="center" align="center"></ste-table-column>
				<ste-table-column
					label="完成状态"
					prop="taskStoreStatusName"
					headerAlign="center"
					align="center"
				></ste-table-column>
				<ste-table-column
					label="执行日期"
					prop="date"
					headerAlign="center"
					align="center"
					width="170"
				></ste-table-column>
			</template>
		</ste-table>
	</view>
</template>

<script>
// import { data1 } from './data.js';
export default {
	data() {
		return {
			vvv: '',
			fontSize: 0,
			cursorNumber: 0,
			v1: '',
			d1: '你好你好你好你好',
			suggestionList: [],
			data: [
				{ label: '三全鲜食（北新泾店）', value: '1全' },
				{ label: 'Hot honey 首尔炸鸡（仙霞路）', value: '2全' },
				{ label: '三贡茶', value: '3全' },
				{ label: '浮生若茶（凌空soho店', value: '4全' },
				{ label: '三枪会山', value: '5全' },
				{ label: '爱茜茜里(西郊百联)', value: '6全' },
				{ label: '三港式小铺', value: '7全' },
				{ label: '三蜀香源麻辣香锅', value: '8全' },
				{ label: '三饭典*新简餐', value: '9全' },
				{ label: '三浏阳蒸菜', value: '10全' },
			],
			v2: false,
			topicList: [],
			v1: '',
			list: [
				{ name: '标签1', id: 1 },
				{ name: '标签2', id: 2 },
				{ name: '标签3', id: 3 },
				{ name: '标签4', id: 4 },
				{ name: '标签5', id: 5 },
			],
			rows: [
				{ project: '入店时的寒暄语', desc: '「感觉很好]', scroe: 5, sum: 0 },
				{
					project: '入店时的寒暄语',
					desc: '店员看着顾客一方，可以听到响亮且有朝气的问候声。',
					scroe: 2,
					sum: 0,
				},
				{ project: '入店时的寒暄语', desc: '打招呼的声音很小，听不到，没有看着顾客一方等。', scroe: 1, sum: 0 },
				// {
				// 	project: '购物袋',
				// 	desc: '如果购买了需要袋子的商品（两件以上商品），主动询问顾客是否需要袋子，并主动地小心认真地装袋。123123333',
				// 	scroe: 1,
				// 	sum: 0,
				// },
				// {
				// 	project: '购物袋',
				// 	desc: '购买了需要袋子的物品（两件以上商品），也不主动询问顾客是否需要袋子，或没有主动小心认真地装袋。1123',
				// 	scroe: 2,
				// 	sum: 0,
				// },
				// {
				// 	project: '购物袋',
				// 	desc: '购买了',
				// 	scroe: 1,
				// 	sum: 0,
				// },
			],
			rows1: [
				{ name: '张三', birth: '2024.01.01', sex: ['男', '男', '男'], state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
			],
			rows2: [
				{ name: '张三', birth: ['2023.12.31', '2023.12.31', '2023.12.31'], sex: ['男', '男', '男'], state: 1 },
				{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
				{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
				{ name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
				{ name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
			],
			rows3: [
				{
					project: '入店时的寒暄语',
					desc: [
						'打招呼的声音很小，听不到，没有看着顾客一方等。',
						'店员看着顾客一方，可以听到响亮且有朝气的问候声。',
						'「感觉普通」店员看着顾客一方有问候，但是声音不响亮无朝气。但是声音不响亮无朝气但是声音不响亮无朝气',
					],
					score: [5, 11, 1],
					sum: 0,
				},
				{
					project: '收银机前的引导',
					desc: [
						'・POS收银机前排队等待的顾客≦3人(不含正在结账的顾客)。',
						'其他店员没有注意到有3位以上的顾客在排队，或收银的店员不向',
					],
					score: [5, 1],
					sum: 0,
				},
			],
			testRows: [
				{
					taskName: '巡店两家任务',
					storeName: '墨水湖店',
					taskStoreStatusName: '未执行',
					date: '20250310-20250313',
				},
				{
					taskName: '巡店两家任务',
					storeName: '墨水湖店123',
					taskStoreStatusName: '未执行',
					date: '20250310-20250313',
				},
			],
		};
	},
	mounted() {
		setTimeout(() => {
			this.list = [
				{ name: '标签1', id: 1 },
				{ name: '标签2', id: 2 },
				{ name: '标签3', id: 3 },
				{ name: '标签4', id: 4 },
			];
		}, 2000);
		// const res = this.spanMethod(null, null, 0, 0);
		// console.log('span res ', res);

		[
			{ name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
			{ name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
			{ name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
		];

		[
			{
				name: ['张三', '李四', '王五'],
				birth: ['2023.12.31', '2024.01.01', '2024.11.01'],
				sex: ['男', '女', '女'],
				state: [1, 2, 1],
			},
		];
	},
	methods: {
		spanMethod(row, colmun, rowIndex, columnIndex) {
			if (columnIndex === 0) {
				if (rowIndex % 3 === 0) {
					return {
						rowSpan: 3,
						colSpan: 1,
					};
				} else {
					return {
						rowSpan: 0,
						colSpan: 0,
					};
				}
			}
		},
		input1(v) {
			console.log('input 触发');
			if (v) {
				setTimeout(() => {
					this.suggestionList = this.data.filter((e) => e.label.indexOf(v) > -1);
				}, 450);
			} else {
				this.suggestionList = [];
			}
		},
		click1() {
			this.v1 = this.d1;
			this.cursorNumber = this.d1.length;
		},
		selectSuggestion(v) {
			console.log('vvv is ', v);
		},
		change111(v) {
			console.log('change1111', v, ' 长度: ', v.length);
		},
		change222(v) {
			console.log('change222', v.detail.value);
			this.$nextTick(() => {
				this.vvv = v.detail.value.substring(0, 10);
			});
			// this.fontSize = v.detail.value.length;
		},
		compositionstart(v) {
			console.log('compositionstart', v);
		},
		compositionupdate(v) {
			console.log('compositionupdate', v);
		},
		compositionend(v) {
			console.log('compositionend', v);
		},
	},
};
</script>

<style scoped lang="scss">
.test-demo {
	padding-top: 120rpx;
	width: 100vw;
}
</style>
