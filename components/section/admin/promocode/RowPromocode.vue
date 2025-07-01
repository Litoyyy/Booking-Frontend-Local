<script lang="ts" setup>
    import { usePromo, type TypeDiscound } from '~/composables/promocode/usePromo';
    import { z } from 'zod';

    const selectOptions = ref<{ name: TypeDiscound }[]>([
        {
            name: 'На номера'
        },
        {
            name: 'Общая'
        },
        {
            name: 'На тарифы'
        }
    ])

    const {
        promocodes,
        toggleActive,
        cheackedAll,
        toggleOn,
        options
    } = usePromo()

    const schema = z.object({
        new_token_input: z.string().min(1),
        input_description: z.string().min(1),
    })

    const formRef = ref<HTMLFormElement | null>(null)

    const eventOnButton = ref<boolean>(false)

    const handleSubmit = () => {

        if (formRef.value) {
            validate(formRef.value, schema, (body: any) => {
                
            })
        }

        if (eventOnButton.value) return null

        setTimeout(() => {
            eventOnButton.value = true
            const button = formRef.value?.elements.namedItem('button') as HTMLButtonElement;
            if (button && !button.dataset.state) {
                button.click()
            }
        }, 10);
    }

</script>

<template>
    <div class="admin-promocode-section__info-block">

        <div class="admin-promocode-section__table">
            <table 
                class="table" 
                table="columns">
                <thead class="table__head">
                    <tr>
                        <th class="table__t1 table__year table_tac" rowspan="2">
                            <ElementCheckbox
                                :checked="cheackedAll"
                                :on-update="() => toggleActive('all')"
                                id="table-head-checkbox"
                            />
                        </th>
                        <th class="table__t2 table__t2_heading gap-4 h-100">
                            Вкл.
                        </th>
                        <th class="table__t2 table__t2_heading table__promocode">
                            Промокод
                        </th>
                        <th class="table__t2 table__t2_heading table__type-discount">
                            Тип скидки
                        </th>
                        <th class="table__t2 table__t2_heading table__discount">
                            Скидка
                        </th>
                        <th class="table__t2 table__t2_heading table__description">
                            Описание
                        </th>
                        <th class="table__drag">
                            <ElementIconButton
                                size="small"
                                color="transparent-secondary"
                                disabled
                                ghost
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                </svg>
                            </ElementIconButton>
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body">
    
                    <tr 
                        v-for="code in promocodes"
                        :key="code.id">
                        <td>
                            <ElementCheckbox 
                                :id="`table-checkbox-${code.id}`"
                                :checked="code.active"
                            />
                        </td>
                        <td class="table__t1">
                            <ElementToggle 
                                :checked="code.on"
                                :on-change="() => toggleOn(code.id)"
                            />
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ code.promocode }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ code.typeDiscound }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ code.discound }}
                        </td>
                        <td class="table__t1 table__t1_tp">
                            {{ code.description }}
                        </td>
                        <td class="table__drag">
                            <Dropdown
                                menu-side='left'
                            >
                                <template #header>
                                    <ElementIconButton
                                        size="small"
                                        color="transparent-secondary"
                                        disabled
                                        ghost
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                    </ElementIconButton>
                                </template>
                                <ElementOption 
                                    v-for="{ name, fun } in options"
                                    @click="fun(code.id)"
                                >
                                    {{ name }}
                                </ElementOption>
                            </Dropdown>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <form ref='formRef' @keyup.enter="handleSubmit" @submit.prevent="handleSubmit" class="admin-promocode-section__fast-create">
            <div class="admin-promocode-section__fast-create__inputs">
                <ElementInput
                    name="new_token_input"
                    id="new_token_input"
                    :class="'input-token'"
                    fake-placeholder="Токен"
                    class="input-token"
                />
                <hr>
                <ElementInput 
                    id="input_description"
                    name="input_description"
                    fake-placeholder="Описание"
                    class="input-description"
                />

                <ElementButton name="button" type='submit' id="button" :class="'dp-none'"></ElementButton>
            </div>
            <span class="admin-promocode-section__fast-create__desc">Введите ячейки и нажмите ↵ Enter</span>
        </form>
    </div>
</template>

<style lang="scss">
    hr {
        height: 100%;
        width: 0.0625rem;
        background-color: $border-primary-subdued-8;
        border: none;
    }

    .admin-promocode-section {
        &__info-block {
            @include df_fdc;
            gap: 1.5rem;
            grid-column: span 12;
        }
        &__table {
            grid-column: span 12;
        }
        &__fast-create {
            @include df_fdc;
            gap: 0.5rem;
            grid-column: span 12;
            padding-inline: 8.25rem 4rem;
            &__inputs {
                @include df_ac;
            }
            &__desc {
                @include text_2;
                color: $text-primary-transparent-48;
                padding-left: 1rem;
            }
        }
    }

    .input-token {
        .input-label {
            border-top-right-radius: 0rem !important;
            border-bottom-right-radius: 0rem !important;
            border-right: 0.0625rem solid $border-inverse-transparent-4;
        }
        min-width: 30rem;
    }
    .input-description {
        .input-label {
            border-top-left-radius: 0rem !important;
            border-bottom-left-radius: 0rem !important;
            border-left: 0.0625rem solid $border-inverse-transparent-4;
        }
        min-width: 53rem;
    }

    .dp-none {
        display: none !important;
    }
</style>