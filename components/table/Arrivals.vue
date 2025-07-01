<script lang="ts" setup>
    const props = defineProps<{
        
    }>();
</script>

<template>
    <table class="table">
        <thead class="table__head">
            <tr>
                <th class="table__t2 table__t2_heading">№ брони</th>
                <th class="table__t2 table__t2_heading">Гость</th>
                <th class="table__t2 table__t2_heading">Время</th>
                <th class="table__t2 table__t2_heading">Статус</th>
                <th class="table__t2 table__t2_heading">Комната</th>
                <th class="table__t2 table__t2_heading">Комментарий гостя</th>
                <th class="table__t2 table__t2_heading">Заметки</th>
                <th class="table__t2 table__t2_heading">
                    <ElementIconButton size="small" ghost disabled>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                    </ElementIconButton>
                </th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr>
                <td class="table__t1 table__t1_link">20241014-0943-92125</td>
                <td class="table__t1 table__t1_link">Кузякова Катарина Сергеевна</td>
                <td class="table__t1 table__t1_tp">14:00</td>
                <td class="table__t1">Ожидается заезд</td>
                <td class="table__t1 table__t1_icon">
                    <!-- <span>5</span> -->
                    <div class="table__t1__button">
                        <ElementIconButton size="small" color="transparent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#1C5BAD"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                </td>
                <td class="table__t2 table__t2_row">Я первый раз у вас. Буду рада наличию халата в номере и приветственного Welcome-столика в первый день. Спасибо</td>
                <td></td>
                <td>
                    <ElementIconButton size="small" ghost color="transparent-secondary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                    </ElementIconButton>
                </td>
            </tr>
            <tr>
                <td class="table__t1 table__t1_link">20241014-0943-92125</td>
                <td class="table__t1 table__t1_link">Кузякова Катарина Сергеевна</td>
                <td class="table__t1 table__t1_tp">14:00</td>
                <td class="table__t1">Ожидается заезд</td>
                <td class="table__t1 table__t1_icon">
                    <!-- <span>5</span> -->
                    <div class="table__t1__button">
                        <ElementIconButton size="small" color="transparent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#1C5BAD"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                </td>
                <td class="table__t2 table__t2_row">Я первый раз у вас. Буду рада наличию халата в номере и приветственного Welcome-столика в первый день. Спасибо</td>
                <td></td>
                <td>
                    <ElementIconButton size="small" ghost color="transparent-secondary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                    </ElementIconButton>
                </td>
            </tr>
            <tr>
                <td class="table__t1 table__t1_link">20241014-0943-92125</td>
                <td class="table__t1 table__t1_link">Кузякова Катарина Сергеевна</td>
                <td class="table__t1 table__t1_tp">14:00</td>
                <td class="table__t1">Ожидается заезд</td>
                <td class="table__t1 table__t1_icon">
                    <!-- <span>5</span> -->
                    <div class="table__t1__button">
                        <ElementIconButton size="small" color="transparent">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="#1C5BAD"/>
                            </svg>
                        </ElementIconButton>
                    </div>
                </td>
                <td class="table__t2 table__t2_row">Я первый раз у вас. Буду рада наличию халата в номере и приветственного Welcome-столика в первый день. Спасибо</td>
                <td></td>
                <td>
                    <ElementIconButton size="small" ghost color="transparent-secondary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#2D3033" fill-opacity="0.16"/>
                        </svg>
                    </ElementIconButton>
                </td>
            </tr>
        </tbody>
    </table>
</template>