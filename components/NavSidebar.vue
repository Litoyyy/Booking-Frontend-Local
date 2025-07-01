<script lang="ts" setup>
    const { 
        showSidebar, 
        sidebarAccordions,
     } = navSidebar();

    const route = useRoute();

</script>
<template>
    <div class="nav-sidebar">
        <div :class="['nav-sidebar__container', { 'show' : showSidebar }]" 
        :data-state="showSidebar ? 'open' : 'close'">
            <div class="nav-sidebar__header">
                <div class="nav-sidebar__header__info">
                    <div class="nav-sidebar__header__avatar">
                        <img src="/_nuxt/assets/images/stub.webp" alt="avatar-image">
                    </div>
                    <div class="nav-sidebar__header__title-block">
                        <span>Измайлово</span>
                        Москва
                    </div>
                </div>
                <ElementIconButton 
                color="transparent-secondary"
                size="small"
                :ghost="true"
                @click="showSidebar = !showSidebar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.83594 12.0001L11.0431 18.2072L12.4573 16.793L7.66437 12.0001L12.4573 7.20718L11.0431 5.79297L4.83594 12.0001ZM10.4859 12.0001L16.693 18.2072L18.1072 16.793L13.3143 12.0001L18.1072 7.20718L16.693 5.79297L10.4859 12.0001Z" fill="#2D3033" fill-opacity="0.32"/>
                    </svg>
                </ElementIconButton>
            </div>
            <div class="nav-sidebar__body">
                <div class="nav-sidebar__body__item">
                    <div class="nav-sidebar__body__item__header">
                        <ElementLink color="transparent" link="/admin/" :state="route.path === '/admin/' ? 'active' : ''">
                            <template #icon>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM11 13V19H13V13H11Z" fill="#1C5BAD"/>
                                </svg>
                            </template>
                            Главная
                        </ElementLink>
                    </div>
                </div>
                <ElementAccordion v-for="(elem, index) in sidebarAccordions" 
                    :key="index"
                    v-model:state="elem.state"
                >
                    <template #header>
                        <ElementLink 
                            color="transparent" 
                            chevron="right" 
                            :state="elem.state"
                        >
                            <template #icon v-if="elem.title === 'Номера'">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10V4ZM3 14C3 13.4477 3.44772 13 4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14Z" fill="#E68F6F"/>
                                </svg>
                            </template>
                            <template #icon v-else-if="elem.title === 'Гостиница'">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10.1111V1L21 7V21H3V7L10 10.1111Z" fill="#E66F6F"/>
                                </svg>
                            </template>
                            <template #icon v-else-if="elem.title === 'Маркетинг'">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 10.063V4C21 3.44772 20.5523 3 20 3H19C17.0214 4.97864 13.3027 6.08728 11 6.61281V17.3872C13.3027 17.9127 17.0214 19.0214 19 21H20C20.5523 21 21 20.5523 21 20V13.937C21.8626 13.715 22.5 12.9319 22.5 12C22.5 11.0681 21.8626 10.285 21 10.063ZM5 7C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H6L7 22H9V7H5Z" fill="#1CAD64"/>
                                </svg>
                            </template>
                            {{ elem.title }}
                        </ElementLink>
                    </template>
                    <div class="nav-sidebar__body__item" v-for="item in elem.items">
                        <ElementAccordion v-if="item.items && item.items?.length > 0"
                            family="child" 
                            v-model:state="item.state"
                        >
                            <template #header>
                                <ElementLink 
                                    class="child"
                                    color="transparent" 
                                    :state="item.state"
                                    :link="item.link"
                                >{{ item.title }}

                                    <ElementIconButton v-if="item.state === 'active' && !!item.linkCreate"
                                        size="small"
                                        :link="item.linkCreate"
                                        color="transparent-secondary"
                                        ghost
                                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                                    </svg>
                                    </ElementIconButton>

                                </ElementLink>
                            </template>
                            <ElementLink v-for="child in item.items"
                                class="sub-child"
                                color="transparent"
                                :link="child.link"
                                :state="child.state"
                            >{{ child.title }}

                                <ElementIconButton v-if="child.state === 'active' && !!child.linkCreate"
                                    size="small"
                                    :link="child.linkCreate"
                                    color="transparent-secondary"
                                    ghost
                                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                                </svg>
                                </ElementIconButton>

                            </ElementLink>
                        </ElementAccordion>
                        <ElementLink v-else
                            class="child"
                            color="transparent" 
                            :state="item.state"
                            :link="item.link"
                        >{{ item.title }}

                        <ElementIconButton v-if="item.state === 'active' && !!item.linkCreate"
                            size="small"
                            :link="item.linkCreate"
                            color="transparent-secondary"
                            ghost
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                        </svg>
                        </ElementIconButton>

                        </ElementLink>
                    </div>
                </ElementAccordion>
            </div>
            <div class="nav-sidebar__footer">
                <div class="nav-sidebar__footer__contact">
                    <span>+7 495 390 30 20</span>
                    Поддержка, круглосуточно
                </div>
                <div class="nav-sidebar__footer__copyright">
                    <div class="logo">
                        <svg width="170" height="32" viewBox="0 0 170 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 24.0669V7.70138H6.76431C8.68086 7.70138 10.082 8.09883 10.9678 8.89373C11.8698 9.68863 12.3207 10.7485 12.3207 12.0733C12.3207 12.915 12.0952 13.6397 11.6443 14.2476C11.1933 14.8399 10.5733 15.2685 9.78409 15.5335C10.7826 15.7517 11.5718 16.1959 12.1516 16.8661C12.7475 17.5207 13.0455 18.378 13.0455 19.4378C13.0455 20.3418 12.8441 21.1445 12.4415 21.8459C12.0389 22.5473 11.4027 23.0928 10.533 23.4825C9.6633 23.8721 8.53591 24.0669 7.15084 24.0669H0ZM2.89899 21.6355H6.83678C8.09301 21.6355 8.95466 21.4407 9.42172 21.051C9.90488 20.6614 10.1465 20.0613 10.1465 19.2508C10.1465 18.4559 9.90488 17.848 9.42172 17.4272C8.93855 16.9908 8.06885 16.7726 6.81263 16.7726H2.89899V21.6355ZM2.89899 14.5282H6.40194C7.52932 14.5282 8.31044 14.3255 8.74529 13.9203C9.19624 13.5151 9.42172 12.9695 9.42172 12.2837C9.42172 11.5824 9.20429 11.0524 8.76944 10.6939C8.3346 10.3199 7.54543 10.1328 6.40194 10.1328H2.89899V14.5282Z" fill="#1C5BAD"/>
                            <path d="M20.6506 24.3241C19.4749 24.3241 18.4119 24.0903 17.4617 23.6227C16.5115 23.1396 15.7545 22.4304 15.1908 21.4952C14.6432 20.5445 14.3694 19.3755 14.3694 17.9883V17.5207C14.3694 16.2115 14.6432 15.1049 15.1908 14.2008C15.7545 13.2813 16.5115 12.5877 17.4617 12.1201C18.4119 11.6525 19.4749 11.4187 20.6506 11.4187C21.8424 11.4187 22.9054 11.6525 23.8395 12.1201C24.7897 12.5877 25.5386 13.2813 26.0862 14.2008C26.6499 15.1049 26.9317 16.2115 26.9317 17.5207V17.9883C26.9317 19.3755 26.6499 20.5445 26.0862 21.4952C25.5386 22.4304 24.7897 23.1396 23.8395 23.6227C22.9054 24.0903 21.8424 24.3241 20.6506 24.3241ZM20.6506 22.0797C21.2626 22.0797 21.8424 21.9394 22.39 21.6589C22.9376 21.3783 23.3805 20.9419 23.7187 20.3496C24.0569 19.7418 24.226 18.9547 24.226 17.9883V17.5207C24.226 16.6323 24.0569 15.9075 23.7187 15.3464C23.3805 14.7697 22.9376 14.3489 22.39 14.084C21.8424 13.8034 21.2626 13.6631 20.6506 13.6631C20.0386 13.6631 19.4588 13.8034 18.9112 14.084C18.3636 14.3489 17.9207 14.7697 17.5825 15.3464C17.2443 15.9075 17.0752 16.6323 17.0752 17.5207V17.9883C17.0752 18.9547 17.2443 19.7418 17.5825 20.3496C17.9207 20.9419 18.3636 21.3783 18.9112 21.6589C19.4588 21.9394 20.0386 22.0797 20.6506 22.0797Z" fill="#1C5BAD"/>
                            <path d="M34.4113 24.3241C33.2356 24.3241 32.1727 24.0903 31.2225 23.6227C30.2722 23.1396 29.5153 22.4304 28.9516 21.4952C28.404 20.5445 28.1302 19.3755 28.1302 17.9883V17.5207C28.1302 16.2115 28.404 15.1049 28.9516 14.2008C29.5153 13.2813 30.2722 12.5877 31.2225 12.1201C32.1727 11.6525 33.2356 11.4187 34.4113 11.4187C35.6032 11.4187 36.6661 11.6525 37.6002 12.1201C38.5505 12.5877 39.2994 13.2813 39.847 14.2008C40.4106 15.1049 40.6925 16.2115 40.6925 17.5207V17.9883C40.6925 19.3755 40.4106 20.5445 39.847 21.4952C39.2994 22.4304 38.5505 23.1396 37.6002 23.6227C36.6661 24.0903 35.6032 24.3241 34.4113 24.3241ZM34.4113 22.0797C35.0234 22.0797 35.6032 21.9394 36.1507 21.6589C36.6983 21.3783 37.1412 20.9419 37.4794 20.3496C37.8177 19.7418 37.9868 18.9547 37.9868 17.9883V17.5207C37.9868 16.6323 37.8177 15.9075 37.4794 15.3464C37.1412 14.7697 36.6983 14.3489 36.1507 14.084C35.6032 13.8034 35.0234 13.6631 34.4113 13.6631C33.7993 13.6631 33.2195 13.8034 32.672 14.084C32.1244 14.3489 31.6815 14.7697 31.3433 15.3464C31.005 15.9075 30.8359 16.6323 30.8359 17.5207V17.9883C30.8359 18.9547 31.005 19.7418 31.3433 20.3496C31.6815 20.9419 32.1244 21.3783 32.672 21.6589C33.2195 21.9394 33.7993 22.0797 34.4113 22.0797Z" fill="#1C5BAD"/>
                            <path d="M42.6157 24.0669V7.70138H45.2731V17.0765L50.5879 11.6759H53.7285L48.5586 16.9362L54.2117 24.0669H51.0228L46.7951 18.5728L45.2731 20.0691V24.0669H42.6157Z" fill="#1C5BAD"/>
                            <path d="M55.9103 24.0669V11.6759H58.5677V24.0669H55.9103ZM57.239 10.2731C56.7397 10.2731 56.329 10.125 56.0069 9.82891C55.7009 9.51718 55.5479 9.11973 55.5479 8.63656C55.5479 8.15338 55.7009 7.76373 56.0069 7.46759C56.329 7.15586 56.7397 7 57.239 7C57.7383 7 58.1409 7.15586 58.4469 7.46759C58.769 7.76373 58.9301 8.15338 58.9301 8.63656C58.9301 9.11973 58.769 9.51718 58.4469 9.82891C58.1409 10.125 57.7383 10.2731 57.239 10.2731Z" fill="#1C5BAD"/>
                            <path d="M61.4554 24.0669V11.6759H63.9195V13.7566C64.2255 13.1332 64.7248 12.5877 65.4173 12.1201C66.1099 11.6525 67.0037 11.4187 68.0989 11.4187C69.6611 11.4187 70.8368 11.8317 71.626 12.6578C72.4152 13.4683 72.8097 14.6606 72.8097 16.2349V24.0669H70.1523V16.8193C70.1523 15.7751 69.9269 14.988 69.4759 14.458C69.025 13.9281 68.2841 13.6631 67.2534 13.6631C66.5125 13.6631 65.9085 13.819 65.4415 14.1307C64.9905 14.4269 64.6523 14.8165 64.4268 15.2997C64.2175 15.7673 64.1128 16.2738 64.1128 16.8193V24.0669H61.4554Z" fill="#1C5BAD"/>
                            <path d="M80.6725 29C79.3518 29 78.2969 28.8441 77.5078 28.5324C76.7347 28.2207 76.163 27.7843 75.7925 27.2232C75.4382 26.6776 75.2127 26.0542 75.1161 25.3528H77.8218C77.9507 25.7269 78.2084 26.0698 78.5949 26.3815C78.9975 26.6932 79.6901 26.8491 80.6725 26.8491C81.8804 26.8491 82.7662 26.5685 83.3299 26.0074C83.8936 25.4463 84.1754 24.6436 84.1754 23.5994V21.8459C83.7728 22.5005 83.2252 23.0383 82.5327 23.4591C81.8401 23.8799 81.0107 24.0903 80.0444 24.0903C78.9653 24.0903 78.0151 23.8565 77.1937 23.3889C76.3884 22.9214 75.7603 22.2278 75.3094 21.3082C74.8584 20.3886 74.6329 19.243 74.6329 17.8714V17.4038C74.6329 16.1258 74.8584 15.0425 75.3094 14.1541C75.7603 13.2657 76.3884 12.5877 77.1937 12.1201C78.0151 11.6525 78.9573 11.4187 80.0202 11.4187C81.0832 11.4187 81.9932 11.6525 82.7501 12.1201C83.5232 12.5877 84.0627 13.1332 84.3687 13.7566V11.6759H86.8328V23.4825C86.8328 25.2281 86.3175 26.5841 85.2867 27.5505C84.256 28.5168 82.7179 29 80.6725 29ZM80.6483 21.8459C81.2765 21.8459 81.8563 21.7212 82.3877 21.4718C82.9192 21.2069 83.346 20.825 83.6681 20.3262C84.0063 19.8119 84.1754 19.1807 84.1754 18.4325V16.796C84.1754 16.1258 84.0063 15.5646 83.6681 15.1126C83.346 14.6451 82.9112 14.2866 82.3636 14.0372C81.8321 13.7878 81.2604 13.6631 80.6483 13.6631C79.6337 13.6631 78.8284 13.9748 78.2325 14.5983C77.6366 15.2062 77.3387 16.1413 77.3387 17.4038V17.8714C77.3387 19.1962 77.6447 20.1938 78.2567 20.864C78.8687 21.5186 79.6659 21.8459 80.6483 21.8459Z" fill="#1C5BAD"/>
                            <path d="M89.9791 24.0669V7.70138H92.9747L98.362 17.4038L103.749 7.70138H106.648V24.0669H103.749V12.6111L99.28 20.6769H97.3474L92.8781 12.6111V24.0669H89.9791Z" fill="#E68F6F"/>
                            <path d="M115.348 24.3241C114.172 24.3241 113.109 24.0903 112.159 23.6227C111.209 23.1396 110.452 22.4304 109.888 21.4952C109.341 20.5445 109.067 19.3755 109.067 17.9883V17.5207C109.067 16.2115 109.341 15.1049 109.888 14.2008C110.452 13.2813 111.209 12.5877 112.159 12.1201C113.109 11.6525 114.172 11.4187 115.348 11.4187C116.54 11.4187 117.603 11.6525 118.537 12.1201C119.487 12.5877 120.236 13.2813 120.784 14.2008C121.347 15.1049 121.629 16.2115 121.629 17.5207V17.9883C121.629 19.3755 121.347 20.5445 120.784 21.4952C120.236 22.4304 119.487 23.1396 118.537 23.6227C117.603 24.0903 116.54 24.3241 115.348 24.3241ZM115.348 22.0797C115.96 22.0797 116.54 21.9394 117.087 21.6589C117.635 21.3783 118.078 20.9419 118.416 20.3496C118.754 19.7418 118.924 18.9547 118.924 17.9883V17.5207C118.924 16.6323 118.754 15.9075 118.416 15.3464C118.078 14.7697 117.635 14.3489 117.087 14.084C116.54 13.8034 115.96 13.6631 115.348 13.6631C114.736 13.6631 114.156 13.8034 113.609 14.084C113.061 14.3489 112.618 14.7697 112.28 15.3464C111.942 15.9075 111.773 16.6323 111.773 17.5207V17.9883C111.773 18.9547 111.942 19.7418 112.28 20.3496C112.618 20.9419 113.061 21.3783 113.609 21.6589C114.156 21.9394 114.736 22.0797 115.348 22.0797Z" fill="#E68F6F"/>
                            <path d="M128.239 24.3241C127.16 24.3241 126.21 24.0903 125.388 23.6227C124.583 23.1552 123.955 22.4538 123.504 21.5186C123.053 20.5678 122.828 19.3911 122.828 17.9883V17.5207C122.828 16.1959 123.053 15.0815 123.504 14.1775C123.955 13.2735 124.583 12.5877 125.388 12.1201C126.21 11.6525 127.152 11.4187 128.215 11.4187C129.181 11.4187 130.011 11.6291 130.703 12.0499C131.412 12.4708 131.968 13.0085 132.37 13.6631V7.70138H135.028V24.0669H132.563V21.9862C132.274 22.6096 131.734 23.1552 130.945 23.6227C130.172 24.0903 129.27 24.3241 128.239 24.3241ZM128.843 22.0797C129.471 22.0797 130.051 21.955 130.582 21.7056C131.114 21.4407 131.541 21.051 131.863 20.5367C132.201 20.0067 132.37 19.3521 132.37 18.5728V16.9129C132.37 16.1959 132.201 15.6036 131.863 15.136C131.541 14.6529 131.106 14.2866 130.558 14.0372C130.027 13.7878 129.455 13.6631 128.843 13.6631C127.828 13.6631 127.023 13.9826 126.427 14.6217C125.831 15.2451 125.533 16.2115 125.533 17.5207V17.9883C125.533 19.3599 125.839 20.3886 126.451 21.0744C127.063 21.7446 127.861 22.0797 128.843 22.0797Z" fill="#E68F6F"/>
                            <path d="M142.16 24.3241C140.646 24.3241 139.503 23.9033 138.729 23.0616C137.956 22.2044 137.57 20.9029 137.57 19.1573V11.6759H140.227V18.9235C140.227 19.9678 140.445 20.7549 140.88 21.2848C141.331 21.8147 142.039 22.0797 143.006 22.0797C143.714 22.0797 144.286 21.9316 144.721 21.6355C145.172 21.3394 145.502 20.9497 145.711 20.4665C145.921 19.9834 146.025 19.469 146.025 18.9235V11.6759H148.683V24.0669H146.219V21.9628C145.913 22.6018 145.413 23.1552 144.721 23.6227C144.044 24.0903 143.191 24.3241 142.16 24.3241Z" fill="#E68F6F"/>
                            <path d="M155.44 24.1838C154.522 24.1838 153.765 24.0592 153.169 23.8098C152.59 23.5448 152.155 23.1162 151.865 22.5239C151.591 21.916 151.454 21.1134 151.454 20.1158V7.70138H154.112V19.9288C154.112 20.6925 154.241 21.2225 154.498 21.5186C154.756 21.7991 155.231 21.9394 155.924 21.9394C156.101 21.9394 156.254 21.9394 156.383 21.9394C156.511 21.9238 156.64 21.9083 156.769 21.8927V24.1137C156.689 24.1293 156.56 24.1449 156.383 24.1605C156.222 24.1761 156.052 24.1838 155.875 24.1838C155.714 24.1838 155.569 24.1838 155.44 24.1838Z" fill="#E68F6F"/>
                            <path d="M163.785 24.3241C162.658 24.3241 161.619 24.0981 160.669 23.6461C159.719 23.1785 158.954 22.4772 158.374 21.542C157.794 20.6068 157.504 19.4222 157.504 17.9883V17.5207C157.504 16.1491 157.778 15.0113 158.326 14.1073C158.889 13.2033 159.63 12.5331 160.548 12.0967C161.466 11.6447 162.465 11.4187 163.544 11.4187C165.493 11.4187 166.982 11.9253 168.013 12.9384C169.06 13.9515 169.583 15.401 169.583 17.2869V18.5962H160.21C160.242 19.4378 160.427 20.1158 160.766 20.6302C161.104 21.1445 161.539 21.5186 162.07 21.7524C162.602 21.9706 163.173 22.0797 163.785 22.0797C164.703 22.0797 165.372 21.9394 165.79 21.6589C166.225 21.3783 166.523 21.012 166.684 20.56H169.342C169.084 21.7914 168.448 22.7265 167.433 23.3656C166.435 24.0046 165.219 24.3241 163.785 24.3241ZM163.665 13.6631C163.069 13.6631 162.513 13.7644 161.998 13.9671C161.482 14.1697 161.064 14.4892 160.741 14.9256C160.419 15.362 160.242 15.9465 160.21 16.6791H166.926C166.91 15.8998 166.757 15.2919 166.467 14.8555C166.177 14.4191 165.79 14.1151 165.307 13.9437C164.824 13.7566 164.277 13.6631 163.665 13.6631Z" fill="#E68F6F"/>
                        </svg>
                    </div>
                    <span>©️ Гамма-Дельта. 2024</span>
                </div>
            </div>

            <div class="nav-sidebar__hidden-body">
                <div class="nav-sidebar__hidden-body__item">
                    <ElementIconButton 
                        link="/admin/"
                        :state="route.path === '/admin/' ? 'active' : ''"
                        size="large" 
                        :ghost="true" 
                        color="accent-blue" 
                    ><svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM11 13V19H13V13H11Z" fill="#1C5BAD"/>
                    </svg>
                    </ElementIconButton>
                </div>
                <div class="nav-sidebar__hidden-body__item" v-for="(elem, index) in sidebarAccordions">
                    <ElementIconButton size="large" :ghost="true" color="accent-orange" v-if="elem.title === 'Номера'">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10V4ZM3 14C3 13.4477 3.44772 13 4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14Z" fill="#E68F6F"/>
                        </svg>
                    </ElementIconButton>
                    <ElementIconButton size="large" :ghost="true" color="accent-red" v-else-if="elem.title === 'Гостиница'">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 10.1111V1L21 7V21H3V7L10 10.1111Z" fill="#E66F6F"/>
                        </svg>
                    </ElementIconButton>
                    <ElementIconButton size="large" :ghost="true" color="accent-green" v-else-if="elem.title === 'Маркетинг'">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10.063V4C21 3.44772 20.5523 3 20 3H19C17.0214 4.97864 13.3027 6.08728 11 6.61281V17.3872C13.3027 17.9127 17.0214 19.0214 19 21H20C20.5523 21 21 20.5523 21 20V13.937C21.8626 13.715 22.5 12.9319 22.5 12C22.5 11.0681 21.8626 10.285 21 10.063ZM5 7C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H6L7 22H9V7H5Z" fill="#1CAD64"/>
                        </svg>
                    </ElementIconButton>
                    <div class="nav-sidebar__hidden-body__dropdown">
                        <div class="nav-sidebar__hidden-body__dropdown__content">
                            <div class="nav-sidebar__hidden-body__dropdown__content__item" v-for="item in elem.items">
                                <ElementAccordion v-if="item.items && item.items.length > 0"
                                    family="child" 
                                    v-model:state="item.state"
                                    >
                                    <template #header>
                                        <ElementLink 
                                            class="child"
                                            color="transparent" 
                                            :state="item.state"
                                            :link="item.link"
                                        >{{ item.title }}

                                            <ElementIconButton v-if="item.state === 'active' && !!item.linkCreate"
                                                size="small"
                                                :link="item.linkCreate"
                                                color="transparent-secondary"
                                                ghost
                                            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                                            </svg>
                                            </ElementIconButton>

                                        </ElementLink>
                                    </template>
                                    <ElementLink v-for="child in item.items"
                                        class="sub-child"
                                        color="transparent"
                                        :link="child.link"
                                        :state="child.state"
                                    >{{ child.title }}

                                        <ElementIconButton v-if="child.state === 'active' && !!child.linkCreate"
                                            size="small"
                                            :link="child.linkCreate"
                                            color="transparent-secondary"
                                            ghost
                                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                                        </svg>
                                        </ElementIconButton>

                                    </ElementLink>
                                </ElementAccordion>
                                <ElementLink v-else
                                    class="child"
                                    color="transparent" 
                                    :state="item.state"
                                    :link="item.link"
                                >{{ item.title }}

                                <ElementIconButton v-if="item.state === 'active' && !!item.linkCreate"
                                    size="small"
                                    :link="item.linkCreate"
                                    color="transparent-secondary"
                                    ghost
                                ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#2D3033" fill-opacity="0.32"/>
                                </svg>
                                </ElementIconButton>

                                </ElementLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-sidebar__hidden-footer">
                <div class="nav-sidebar__hidden-footer__item">
                    <ElementIconButton color="transparent" size="large" :ghost="true">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.5 19.1567V23.2821C24.5 23.8946 24.0264 24.4028 23.4156 24.446C22.9053 24.482 22.489 24.5 22.1667 24.5C11.8573 24.5 3.5 16.1427 3.5 5.83333C3.5 5.51099 3.51803 5.09468 3.55408 4.58442C3.59726 3.97353 4.10543 3.5 4.71784 3.5H8.84345C9.14291 3.5 9.39372 3.72682 9.42378 4.02477C9.45078 4.29225 9.47588 4.507 9.49908 4.66902C9.73507 6.31717 10.2171 7.88592 10.9068 9.33687C11.0175 9.56976 10.9453 9.84852 10.7355 9.9984L8.21747 11.7971C9.75044 15.3779 12.622 18.2496 16.2029 19.7826L17.9983 17.2689C18.1501 17.0565 18.4322 16.9835 18.6678 17.0954C20.1187 17.7845 21.6873 18.266 23.3352 18.5015C23.4962 18.5246 23.7096 18.5494 23.9752 18.5762C24.2732 18.6063 24.5 18.8572 24.5 19.1567Z" fill="#2D3033" fill-opacity="0.48"/>
                        </svg>
                    </ElementIconButton>
                    <div class="nav-sidebar__hidden-footer__dropdown">
                        <div class="nav-sidebar__hidden-footer__dropdown__content">
                            <ElementLink>+7 495 390 30 20</ElementLink>
                            <span>
                                Поддержка (круглосуточно)
                            </span>
                        </div>
                    </div>
                </div>
                <div class="nav-sidebar__hidden-footer__copyright">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 24.067V7.70142H6.76431C8.68086 7.70142 10.082 8.09887 10.9678 8.89376C11.8698 9.68866 12.3207 10.7485 12.3207 12.0734C12.3207 12.915 12.0952 13.6398 11.6443 14.2476C11.1933 14.8399 10.5733 15.2685 9.78409 15.5335C10.7826 15.7517 11.5718 16.1959 12.1516 16.8661C12.7475 17.5208 13.0455 18.378 13.0455 19.4379C13.0455 20.3419 12.8441 21.1446 12.4415 21.8459C12.0389 22.5473 11.4027 23.0928 10.533 23.4825C9.6633 23.8722 8.53591 24.067 7.15084 24.067H0ZM2.89899 21.6355H6.83678C8.09301 21.6355 8.95466 21.4407 9.42172 21.051C9.90488 20.6614 10.1465 20.0613 10.1465 19.2508C10.1465 18.4559 9.90488 17.8481 9.42172 17.4272C8.93855 16.9908 8.06885 16.7726 6.81263 16.7726H2.89899V21.6355ZM2.89899 14.5282H6.40194C7.52932 14.5282 8.31044 14.3256 8.74529 13.9203C9.19624 13.5151 9.42172 12.9696 9.42172 12.2838C9.42172 11.5824 9.20429 11.0525 8.76944 10.694C8.3346 10.3199 7.54543 10.1329 6.40194 10.1329H2.89899V14.5282Z" fill="#1C5BAD"/>
                        <path d="M15.3308 24.067V7.70142H18.3264L23.7137 17.4039L29.101 7.70142H32V24.067H29.101V12.6111L24.6317 20.677H22.6991L18.2298 12.6111V24.067H15.3308Z" fill="#E68F6F"/>
                    </svg>
                    ©
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .nav-sidebar {
        z-index: 50;
        position: sticky;
        top: 0;
        padding: 1rem;
        height: 100dvh;
        &__container {
            background-color: $bg-inverse-transparent-4;
            border-radius: .5rem;
            width: fit-content;
            height: 100%;
            @include df_fdc;
            @include transition(width);
            width: 4.75rem;
            &.show {
                width: 16.75rem;
            }
        }
        &__header {
            display: flex;
            align-items: flex-start;
            gap: 2rem;
            padding: 1rem;
            &__info {
                @include df_ac;
                gap: 1rem;
            }
            &__avatar {
                height: 3rem;
                aspect-ratio: 1;
                border-radius: .5rem;
                overflow: hidden;
                img {
                    @include image_contain;
                }
            }
            &__title-block {
                @include df_fdc;
                @include text_2;
                color: $text-primary-transparent-48;
                span {
                    @include strong_1;
                    color: $text-primary;
                }
            }
            .icon-button {
                @include transition(transform);
            }
        }
        &__body {
            padding: 1rem .5rem;
            height: 100%;
            overflow-y: auto;
            .link {
                padding: .5rem;
                width: 100%;
                &.child {
                    padding-left: 3rem;
                }
                &.sub-child {
                    padding-left: 4rem;
                }
            }
            a.link {
                &[data-state="active"] {
                    background-color: $bg-primary;
                    border-radius: .5rem;
                }
                &:has(.icon-button) {
                    justify-content: space-between;
                }
            }
            .nav-item {
                &__header {
                    padding: .5rem;
                }
                &__content {
                    .sub-category-block {
                        .link {
                            padding: .5rem 0 .5rem 4rem;
                        }
                    }
                }
            }
        }
        &__footer {
            @include df_fdc;
            gap: 1rem;
            padding: 1rem;
            &__contact {
                @include df_fdc;
                @include text_2;
                color: $text-primary-transparent-48;
                span {
                    @include text_1;
                    color: $text-primary;
                }
            }
            &__copyright {
                @include df_fdc;
                gap: .25rem;
                .logo {
                    display: flex;
                    height: 2rem;
                    width: 10.625rem;
                    svg {
                        @include wh_100;
                    }
                }
                span {
                    @include text_2;
                    color: $text-primary-transparent-32;
                }
            }
        }
        &__hidden-body {
            display: none;
        }
        &__hidden-footer {
            display: none;
        }

        &__container {
            &[data-state="close"] {
                @include transition(width);
                .nav-sidebar__header {
                    @include df_fdc_ac;
                    gap: 1rem;
                    padding: 1rem .88rem .5rem .88rem;
                    &__title-block {
                        display: none;
                    }
                    .icon-button {
                        transform: rotate(180deg);
                        @include transition(transform);
                    }
                }
                .nav-sidebar__body {
                    display: none;
                }
                .nav-sidebar__footer {
                    display: none;
                }
                .nav-sidebar__hidden-body {
                    @include df_fdc;
                    padding: 1rem .5rem;
                    height: 100%;
                    &__dropdown {
                        position: absolute;
                        top: 0;
                        left: 3.5rem;
                        padding-left: 1.25rem;

                        opacity: 0;
                        pointer-events: none;
                        @include transition(opacity);
                        &__content {
                            @include df_fdc;
                            padding: 1rem;
                            width: 17.75rem;
                            background-color: $bg-primary;
                            border-radius: .5rem;
                            box-shadow: 0px 0px 1rem 0px rgba(45, 48, 51, 0.08);
                            .accordion-item {
                                &__header {
                                    padding: 0;
                                }
                            }
                            .link {
                                padding: .375rem .5rem;
                                justify-content: space-between;
                                text-wrap: nowrap;
                            }
                            .sub-child {
                                padding-left: 3rem;
                            }
                        }
                    }
                    &__item {
                        position: relative;
                        display: flex;
                        &:hover,
                        &:has(.nav-sidebar__hidden-body__dropdown__content:hover) {
                            .nav-sidebar__hidden-body__dropdown {
                                opacity: 1;
                                pointer-events: auto;
                                @include transition(opacity);
                            }
                        }
                    }
                }
                .nav-sidebar__hidden-footer {
                    @include df_fdc;
                    gap: 1rem;
                    padding: .5rem;
                    &__copyright {
                        @include df_fdc_ac;
                        gap: .25rem;
                        @include text_2;
                        color: $text-primary-transparent-32;
                        svg {
                            max-width: 2rem;
                            max-height: 2rem;
                            @include wh-100;
                        }
                    }
                    &__dropdown {
                        position: absolute;
                        top: 50%;
                        left: 3.5rem;
                        padding-left: 1.25rem;
                        width: 17.75rem;
                        transform: translateY(-50%);

                        opacity: 0;
                        pointer-events: none;
                        @include transition(opacity);
                        &__content {
                            background-color: $bg-primary;
                            box-shadow: 0px 0px 1rem 0px rgba(45, 48, 51, 0.08);
                            border-radius: .5rem;
                            padding: 1rem;
                            @include df_fdc;
                            span {
                                @include text_2;
                                color: $text-primary-transparent-48;
                            }
                        }
                    }
                    &__item {
                        position: relative;
                        &:hover {
                            .nav-sidebar__hidden-footer__dropdown {
                                opacity: 1;
                                pointer-events: all;
                                @include transition(opacity);
                            }
                        }
                    }
                }
            }
        }

        
    }
</style>