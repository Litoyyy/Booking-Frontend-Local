<script lang="ts" setup>
    definePageMeta({
        isAdmin: true,
        breadcrumbs: [
            {
                name: 'Номера'
            },
            {
                name: 'Тарифы',
                slug: '/admin/numbers/tariff/',
            },
            {
                name: 'Создать',
                slug: '/admin/numbers/tariff/create/1/',
                state: 'active'
            }
        ],
        breadcrumbsSteps: [
            {
                name: '1.Общие настройки',
                slug: '/admin/numbers/tariff/create/1/',
            },
            {
                name: '2.Цены и ограничения',
                slug: '/admin/numbers/tariff/create/2/',
                state: 'active'
            },
            {
                name: '3.Услуги',
                slug: '/admin/numbers/tariff/create/3/',
            },
        ],
        headerType: 'breadcrumbs-steps'
    });

    const servicesCategories = ref();

    const getCategories=async()=>{
        const res = await getData('/hotel/service');
        servicesCategories.value = res.results;
        console.log(servicesCategories.value);
    };
    onMounted(async()=>{
        await getCategories();
    });
</script>

<template>
    <section>
        <div class="create-tariff-third-section">
            <div class="create-tariff-third-section__container container_admin">
                <div class="create-tariff-third-section__header">
                    <div class="admin-section__title-block">
                        <div class="admin-section__title-block__title_sub">
                            Выберите услуги, которые будут входить в тариф
                        </div>
                    </div>
                    <div class="admin-section__filters-block">
                        <div class="admin-section__filters-block__sort">
                            <div class="admin-section__filters-block__sort__elem">
                                <ElementLink
                                    color="transparent"
                                    @click="dropFilters"
                                >Все
                                </ElementLink>
                            </div>
                            <div class="admin-section__filters-block__sort__elem" v-for="elem in filterElems">
                                <span class="title">{{ elem.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="create-tariff-third-section__body">
                    <div class="create-tariff-third-section__body__table">
                        <table class="table">
                            <thead class="table__head">
                                <tr>
                                    <th class="table__checkbox">
                                        <ElementCheckbox
                                            :checked="allChecked"
                                            :on-update="(checked: boolean)=>checkAllFunc(checked)"
                                            id="table-head-checkbox"
                                        />
                                    </th>
                                    <th class="table__t2 table__t2_heading table__name">
                                        Название
                                    </th>
                                    <th class="table__t2 table__t2_heading table__tariffs">
                                        Тарифы
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Тип оплаты
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Группа
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Темп начисления
                                    </th>
                                    <th class="table__t2 table__t2_heading table__same-width">
                                        Статус
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="table__body">
                                <tr>
                                    <td>
                                        <ElementCheckbox
                                            id="table-head-checkbox"
                                        />
                                    </td>
                                    <td class="table__t1">
                                        Завтрак «Шведский стол»
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        3
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Дополнительная
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Питание
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        За гостя в сутки
                                    </td>
                                    <td class="table__t1 table__t1_tp">
                                        Активная
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <ElementButton
                    size="large"
                >Сохранить
                </ElementButton>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .create-tariff-third-section {
        &__header {
            grid-column: span 12;
            @include df_fdc;
            gap: 1.5rem;
        }
        &__body {
            grid-column: span 12;
            &__table {
                width: 100%;
                .table {
                    width: 100%;
                    &__name {
                        width: 30rem;
                    }
                    &__tariffs {
                        width: 8.75rem;
                    }
                    &__same-width {
                        width: 14%;
                    }
                }
            }
            
        }
        .button {
            grid-column: span 12;
        }
    }
</style>