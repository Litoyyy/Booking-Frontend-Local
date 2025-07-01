<script lang="ts" setup>
    import { usePromo } from '~/composables/promocode/usePromo';

    const {
        promocodes,

        toggleActive,
        cheackedAll,

        toggleOn,
        
        options
    } = usePromo()

</script>

<template>
    <div class="admin-promocode-section__table">
        
        
        <div 
            class="admin-promocode-section__item"
            v-for="code in promocodes"
            :key="code.id"
        >
            <div class="admin-promocode-section__item__header">
                <ElementToggle 
                    :id="`active-promocode-${code.id}`"
                    :checked="code.active"
                    :on-change="() => toggleActive(code.id)"
                />
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
            </div>

            <span class="admin-promocode-section__item__promocode">
                {{ code.promocode }}
            </span>

            <div class="admin-promocode-section__item__info-promo">
                <span>{{ code.discound }}</span>
                <span>{{ code.typeDiscound }}</span>
            </div>

            <span class="admin-promocode-section__item__description">
                {{ code.description }}
            </span>

        </div>


    </div>

</template>

<style lang="scss">
    .admin-promocode-section {
        &__table {
            grid-column: span 12;
            @include grid(4, 1rem);
        }
        &__item {
            @include df_fdc;
            gap: 1.5rem;
            border: 0.0625rem solid $border-primary-subdued-8;
            border-radius: 0.5rem;
            padding: 1rem;
            &__header {
                @include df_jb_ac;
            }
            &__promocode {
                @include heading_3;
                color: $text-primary;
                height: 4.125rem;
            }
            &__info-promo {
                @include df_fdc;
                @include text_1;
                color: $text-primary-transparent-48;
            }
            &__description {
                @include text_1;
                color: $text-primary-transparent-48;
                height: 5.25rem;
            }
        }
    }
</style>