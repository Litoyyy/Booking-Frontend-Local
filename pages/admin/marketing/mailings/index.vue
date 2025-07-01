<script lang="ts" setup>
import Dialog from '~/components/Dialog.vue';
import { useChooseEmailNavigate, useEmailNavigate, type TypeEmail } from '~/composables/admin/letters/useEmailNavigate';

    
    definePageMeta({
        isAdmin: true,
    });
    
    interface EmailInfo {
        checkboxValue: boolean,
        inclusion: boolean,
        typeEmail: TypeEmail,
        conditions: string,
        copyEmail: string
    }

    const {
        emailTypeState,
        changeEmailTypeState
    } = useChooseEmailNavigate()

    const emailInfoData = ref<Array<EmailInfo>>([
        {
            checkboxValue: false,
            inclusion: false,
            typeEmail: 'welcome',
            conditions: '3 дня после заезда',
            copyEmail: 'luxe-tourism@gmail.com'
        },
        {
            checkboxValue: false,
            inclusion: false,
            typeEmail: 'feedback',
            conditions: '1 день после заезда',
            copyEmail: 'luxe-tourism@gmail.com'
        },
        {
            checkboxValue: false,
            inclusion: false,
            typeEmail: 'guest',
            conditions: 'Мгновенно',
            copyEmail: 'luxe-tourism@gmail.com'
        },
        {
            checkboxValue: false,
            inclusion: false,
            typeEmail: 'hotel',
            conditions: 'Мгновенно',
            copyEmail: 'luxe-tourism@gmail.com'
        },
        {
            checkboxValue: false,
            inclusion: false,
            typeEmail: 'payment',
            conditions: 'Предложение предоплаты',
            copyEmail: 'luxe-tourism@gmail.com'
        }
    ])

    const getTitleFormType = (type: 'welcome' | 'feedback' | 'guest' | 'hotel' | 'payment') => {
        switch (type) {
            case 'welcome':
                return 'Welcome-письмо'
                break;

            case 'feedback':
                return 'Feedback-письмо'
                break;
        
            case 'guest':
                return 'Незавершенное бронирование гостя'
                break;

            case 'hotel':
                return 'Незавершенное бронирование гостя для средства размещения'
                break;

            case 'payment':
                return 'Предложение предоплаты'
                break;
        }
    }

    const toggleCheckbox = (index: number) => {
        emailInfoData.value[index].checkboxValue = !emailInfoData.value[index].checkboxValue
    }

    const toggleToggle = (index: number) => {
        emailInfoData.value[index].inclusion = !emailInfoData.value[index].inclusion
    }

    const { goToWithEmailType } = useEmailNavigate()

    const handleLink = (typeEmail: TypeEmail) => {
        goToWithEmailType('/admin/create-letter', typeEmail)
    }

    setTimeout(() => {
        changeEmailTypeState(false, false, '')
    }, 5000)

</script>

<template>
    <section>
        <div class="admin-mailing-section">
            <div class="admin-mailing-section__container container_admin">

                <div class="admin-section__title-block">
                    <div class="admin-section__title-block__title">
                        Рассылки
                    </div>
                </div>

                <div class="admin-mailing-section__table">
                    <table class="table">
                        <thead class="table__head">
                            <tr>
                                <th class="table__checkbox">
                                    <ElementCheckbox />
                                </th>
                                <th class="table__t2 table__t2_heading table__toggle">
                                    Вкл.
                                </th>
                                <th class="table__t2 table__t2_heading table__email-type">
                                    Тип письма
                                </th>
                                <th class="table__t2 table__t2_heading table__conditions-send">
                                    Условия отправки
                                </th>
                                <th class="table__t2 table__t2_heading table__email-copy">
                                    E-mail для копий писем
                                </th>
                                <th class="table__drag">
                                    <ElementIconButton
                                        size='small'
                                        color='transparent-secondary'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                                        </svg>
                                    </ElementIconButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in emailInfoData" class="table__body">
                            <tr>
                                <td>
                                    <ElementCheckbox
                                        :id="`email-`+item.typeEmail"
                                        :checked="item.checkboxValue"
                                        @click="toggleCheckbox(index)" />
                                </td>
                                <td>
                                    <ElementToggle 
                                        :id="`tog-email-`+item.typeEmail"
                                        @click="toggleToggle(index)" />
                                </td>
                                <td>
                                    <ElementLink 
                                        color="neutral"
                                        :link="`/admin/marketing/mailings/edit/${item?.id}/`"
                                    >{{ getTitleFormType(item.typeEmail) }}
                                    </ElementLink>
                                </td>
                                <td class="table__t1">
                                    {{ item.conditions }}
                                </td>
                                <td class="table__t1">
                                    {{ item.copyEmail }}
                                </td>
                                <td class="table__drag">
                                    <Dropdown menu-side="left">
                                        <template #header>
                                            <ElementIconButton
                                                size="small"
                                                color="transparent-secondary"
                                                ghost
                                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                            </svg>
                                            </ElementIconButton>
                                        </template>
                                        <ElementOption>
                                            <NuxtLink :to="`/admin/marketing/mailings/edit/${item?.id}/`">
                                                Редактировать
                                            </NuxtLink>
                                        </ElementOption>
                                        <ElementOption
                                            :on-click="()=>{
                                                // popupDeleteOpened = true;
                                                // categoryToEdit = category;
                                            }"
                                        >
                                            Удалить
                                        </ElementOption>
                                    </Dropdown>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <Dialog 
        color='inverse'
        title="Создание завершено"
        :description="emailTypeState.textDesc"
        drawLine
        type='dialog'
        :visible="emailTypeState.visible"
    />
</template>

<style lang="scss">
    .admin-mailing-section {
        .admin-section__title-block {
            grid-column: span 12;
        }
        &__table {
            grid-column: span 12;
            .table {
                &__email-type {
                    min-width: 40rem;
                }
                &__conditions-send {
                    min-width: 20rem;
                }
                &__email-copy {
                    width: 23rem;
                }
            }
        }
    }
</style>