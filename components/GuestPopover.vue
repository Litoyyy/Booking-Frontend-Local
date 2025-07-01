<script lang="ts" setup>
    const props = defineProps<{
        number?: string,
        name?: string,
        date?: string,
        type?: 'basic' | 'new',
    }>();
</script>

<template>
    <div class="guest-popover" :data-type="props.type || 'basic'">
        <div class="guest-popover__info-block">
            <div class="guest-popover__info-block__status">
                <ElementLink theme="dark">
                    {{ number }}
                </ElementLink>
                <span>
                    Подтверждена
                </span>
            </div>
            <ElementIconButton 
            size="small"
            :ghost="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="white" fill-opacity="0.48"/>
                </svg>
            </ElementIconButton>
        </div>
        <div class="guest-popover__name">
            {{ name }}
        </div>
        <div class="guest-popover__date">
            {{ date }}
        </div>

        <div class="guest-popover__button-block">
            <ElementIconButton color="positive">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6663 17.6995L22.3908 6.9751L24.0407 8.62501L11.6663 20.9993L4.2417 13.5748L5.89162 11.9249L11.6663 17.6995Z" fill="white"/>
                </svg>
            </ElementIconButton>
            <ElementIconButton color="negative">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9998 12.3509L19.7746 6.57617L21.4245 8.22608L15.6497 14.0008L21.4245 19.7755L19.7746 21.4254L13.9998 15.6507L8.22512 21.4254L6.5752 19.7755L12.3499 14.0008L6.5752 8.22608L8.22512 6.57617L13.9998 12.3509Z" fill="white"/>
                </svg>
            </ElementIconButton>
        </div>
    </div>
</template>

<style lang="scss">
    .guest-popover {
        position: relative;
        padding: 1.5rem;
        border-radius: .5rem;
        background-color: $bg-inverse;
        @include df_fdc;
        gap: 1.5rem;
        &__info-block {
            display: flex;
            align-items: flex-start;
            gap: .75rem;
            span {
                @include text_1;
                color: $text-inverse-transparent-48;
            }
            &__status {
                @include df_fdc;
                gap: .25rem;
                width: 100%;
            } 
        }
        &__name {
            @include heading_3;
            color: $text-inverse;
        }
        &__date {
            @include text_1;
            color: $text-inverse;
        }
        &__button-block {
            position: absolute;
            right: 0;
            bottom: 0;
            @include df_ac;
            gap: .75rem;
            padding: 1.5rem 2rem 1.5rem 1rem;
            width: fit-content;

            display: none;
        }
        &[data-type="new"] {
            .guest-popover__button-block {
                display: flex;
            }
        }
    }
</style>