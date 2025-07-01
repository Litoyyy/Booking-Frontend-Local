<script lang="ts" setup>
  const route = useRoute();
  const router = useRouter();
  
  const user = useUser();

  const headerProps = ref({
    headerType: 'panel',
    headerTheme: 'light',
    breadcrumbs: [] as Array<any>,
    breadcrumbsSteps: [] as Array<any>
  });

  const isChecking = ref(true);
  const isAdminPage = ref(false);

  await router.isReady();

  isAdminPage.value = route.meta.isAdmin === true;

  const checkAuth = async () => {
    const token = user.token.value;
    if (route.meta.isAdmin && !token) {
      await router.push('/admin/login/');
      isAdminPage.value = false;
    } else if(route.meta.isAdmin && !!token) {
      isAdminPage.value = true;
    }
    isChecking.value = false;
  };

  onMounted(async()=>{
    await checkAuth();
  });

  watch(() => route.meta.isAdmin, async (newVal) => {
    isAdminPage.value = newVal === true;
    await checkAuth();
  }, { immediate: true });

  watchEffect(() => {
    headerProps.value = {
      headerType: route.meta.headerType as 'panel' | 'catalog' | 'catalog-fixed' | 'breadcrumbs' | 'breadcrumbs-steps',
      headerTheme: route.meta.headerTheme as 'light' | 'dark',
      breadcrumbs: Array.isArray(route.meta.breadcrumbs) ? route.meta.breadcrumbs : [],
      breadcrumbsSteps: Array.isArray(route.meta.breadcrumbsSteps) ? route.meta.breadcrumbsSteps : [],
    };
  });
</script>

<template>
  <div v-if="isChecking">
    <LoadingOverlay />
  </div>

  <div v-else-if="!isChecking && isAdminPage">
    <div class="admin-section">
      <NavSidebar></NavSidebar>
      <div class="admin-section__main">
        <div class="admin-section__header">
          <SectionHeader v-bind="headerProps" :headerType="headerProps.headerType ?? 'breadcrumbs'" />
        </div>
        <NuxtPage />
      </div>
    </div>
  </div>

  <div v-else-if="!isChecking && !isAdminPage">
    <SectionHeader v-bind="headerProps" :headerType="headerProps.headerType ?? 'panel'"/>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
  .admin-section {
    display: flex;
    &__header {
      z-index: 50;
      position: sticky;
      top: 0;
      width: 100%;
      margin: 0;
      gap: 0;
      @include df_fdc;
      :deep(header) {
        position: static;
      }
    }
    &__title-block {
      @include df_ac;
      justify-content: space-between;
      &__title {
        @include df_ac;
        gap: .25rem;
        @include heading_1;
        &_sub {
          @include heading_3;
        }
      }
      &__btns-block {
        @include df_ac;
        gap: 1.5rem;
        &__btns {
          @include df_ac;
          &_text {
            @include df_ac;
            gap: .75rem;
          }
        }
      }
    }
    &__main {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__filters-block {
      display: flex;
      justify-content: space-between;
      &__sort {
        display: flex;
        flex-wrap: wrap;
        row-gap: .75rem;
        column-gap: 1.5rem;
        max-width: 79.125rem;
        width: 100%;
        &__elem {
          display: flex;
          gap: .5rem;
          .title {
            @include text_1;
            color: $text-primary-transparent-48;
          }
        }
      }
    }
  }
</style>