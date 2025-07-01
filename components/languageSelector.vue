<script lang="ts" setup>
    const { selectLanguages, selectedLang, selectFunc } = useLanguages();

    const { currentlyMobile } = mobileState();

    const bottomSheetActive = ref(false);
</script>

<template>
    <Dropdown menu-side="left" v-if="!currentlyMobile">
        <template #header>
            <ElementLink
                size="small"
                chevron="right"
            >{{ selectedLang.key }}
            </ElementLink>
        </template>
        <div class="dropdown__option" v-for="(language, index) in selectLanguages">
            <ElementOption
                type="ghost"
                :state="language.state"
                @click="selectFunc(index)"
            ><span>{{ language.key }}</span>
                {{ language.value }}
            </ElementOption><hr>
        </div>
    </Dropdown>
    <ElementLink v-else
        size="small"
        @click="bottomSheetActive = true"
    >{{ selectedLang.key }}
    </ElementLink>
    <BottomSheetLanguage
        :languages="selectLanguages"
        :selected="selectedLang"
        :on-select="(index)=>{
            selectFunc(index);
            bottomSheetActive = false
        }"
        v-model:active="bottomSheetActive"
    />
</template>