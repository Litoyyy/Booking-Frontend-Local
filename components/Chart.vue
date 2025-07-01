<script lang="ts" setup>
    import * as echarts from 'echarts';
    import { symbol } from 'zod';

    const periodOptions = ref<{ text: string, state: string }[]>([]);

    periodOptions.value.push(
        {
            text: 'неделя',
            state: ''
        },
        {
            text: 'месяц',
            state: ''
        },
        {
            text: '3 месяца',
            state: ''
        },
        {
            text: '6 месяцев',
            state: ''
        },
        {
            text: '12 месяцев',
            state: ''
        },
        {
            text: '24 месяца',
            state: ''
        },
    );

    const selectPeriod=(period: Object)=>{
        periodOptions.value.map(obj=>obj.state ='')
        period.state = 'active';
    }

    onMounted(() => {
        const data = [["Янв.",10],["Фев.",16],["Мар.",10],["Апр.",20], ["Май",23], ["Июн.",18], ["Июл.",23], ["Авг.",10], ["Сен.",70], ["Окт.",84], ["Ноя.",100], ["Дек.",85]];
        const dateList = data.map(function (item) {
            return item[0];
        });
        const valueList = data.map(function (item) {
            return item[1];
        });

        var chartDom = document.getElementById('main');
        if (!chartDom) {
            console.error('Элемент #main не найден');
            return;
        }
        var myChart = echarts.init(chartDom);
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                borderRadius: '8',
                backgroundColor: '#2D3033',
                borderWidth: 0,
                padding: [4, 8],
                formatter: function (params) {
                    return params.length ? `${params[0].value}` : '';
                },
                position: function (point) {
                    return [point[0] - 20, point[1] + 16];
                },
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 400,
                    fontFamily: "Golos Text"
                },
            },
            title: {
                text: '2024',
                left: -6,
                bottom: 11,
                textStyle: {
                    fontSize: '.75rem',
                    fontWeight: 400,
                    color: "#2D303329",
                    fontFamily: "Golos Text"
                }
            },
            grid: {
                left: '4%',  
                right: '2%', 
                bottom: '15%',
                top: '5%',
                containLabel: false,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateList,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2D30330A'
                    }
                },
                axisLabel: {
                    interval: 0,
                    margin: 16,
                    padding: [0, 0, 0, 20],
                    fontSize: '.75rem',
                    fontWeight: 400,
                    color: "#2D30337A",
                    fontFamily: "Golos Text",
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 16,
                    fontSize: '.75rem',
                    fontWeight: 400,
                    color: "#2D30337A",
                    fontFamily: "Golos Text"
                },
                axisTick: {
                    alignWithLabel: true
                },
                splitNumber: 5,
                data: [0, 100]
            },
            series: [{
                width: 100,
                areaStyle: {
                    color: '#E68F6F14',
                    width: 100,
                },
                type: 'line',
                showSymbol: false,
                symbolSize: 12,
                symbol: 'circle',
                markLine: {
                    data: [
                        { yAxis: 0, lineStyle: { color: '#2D30330A', type: 'solid', width: 1 } },
                        { yAxis: 100, lineStyle: { color: '#2D30330A', type: 'solid', width: 1 } }
                    ],
                    symbol: ['none', 'none'],
                    label: { 
                        show: false
                    },
                    animation: false
                },
                data: valueList,
                lineStyle: {
                    color: '#E68F6F',
                    width: 2
                },
                itemStyle: {
                    color: '#1C5BAD',
                },
            }]
        };

        myChart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            myChart.resize();
        });

        resizeObserver.observe(chartDom);

        onBeforeUnmount(() => {
            resizeObserver.disconnect();
        });
    });
</script>

<template>
    <div class="chart">
        <div class="chart__header">
            <span>
                График бронирования
            </span>
            <Dropdown>
                <template #header>
                    <ElementLink
                        size="small"
                        color="transparent"
                        chevron="right"
                    >12 месяцев
                    </ElementLink>
                </template>
                <div class="dropdown__option" v-for="(periodValue, index) in periodOptions">
                    <ElementOption
                        type='default'
                        :state="periodValue.state"
                        :on-click="()=>{selectPeriod(periodValue)}"
                    >{{ periodValue.text }}
                    </ElementOption>
                    <hr>
                </div>
            </Dropdown>
        </div>
        <div id="main" style="height: 18.4375rem; width: 100%;"></div>
    </div>
</template>

<style lang="scss" scoped>
    .chart {
        @include df_fdc;
        gap: 1.5rem;
        padding: 1.5rem;
        border-radius: 1rem;
        border: 1px solid $border-primary-transparent-8;
        &__header {
            @include df_jb_ac;
            span {
                @include heading_3;
            }
            .dropdown {
                &::v-deep(.dropdown__header) {
                    @include df_ac;
                    gap: 1rem;
                    text-wrap: nowrap;
                    color: $text-primary-transparent-48;
                    svg {
                        width: 1rem;
                        height: 1rem;
                        aspect-ratio: 1;
                    }
                }
            }
        }
    }
</style>