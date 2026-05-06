import { defineStore } from "pinia";
import { ref, computed } from 'vue';
export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([
        {
            id:1,
            type:'order',
            icon:'fa-solid fa-box',
            title:'訂單出貨通知',
            body:'您的訂單 #20260501 已出貨，預計明日送達，請保持手機暢通',
            time:'2分鐘前',
            read:false,
        },
        {
            id:2,
            type:'promo',
            icon:'fa-solid fa-tag',
            title:'限時優惠來囉！',
            body:'本週特選:高山有機香蕉買二送一，活動只到週日23:59，快來搶購！',
            time:'1小時前',
            read:false,
        },
        {
            id:3,
            type:'order',
            icon:'fa-solid fa-circle-check',
            title:'訂單已完成',
            body:'訂單 #20260428已確認收貨完成，感謝您的支持，歡迎再次選購',
            time:'昨天',
            read:'false',
        },
        {
            id:4,
            type:'system',
            icon:'fa-solid fa-seedling',
            title:'新商品上架通知',
            body:'小農王大明的當季玉荷包已上架，數量有限，手刀下單！',
            time:'2天前',
            read:true,
        },
        {
            id:5,
            type:'system',
            icon:'fa-solid fa-bell',
            title:'帳戶安全提醒',
            body:'您的帳戶已於 05/05 15:26 在新裝置登入，如非本人操作請立即變更密碼。',
            time:'剛剛',
            read:true,
        },
    ])
    const unreadCount = computed(() => 
        notifications.value.filter(n => !n.read).length
    )
    function markAsRead(id){
        const n = notifications.value.forEach(n => { n.read = true })
    }
    return{ notifications, unreadCount, markAsRead, markAllAsRead }
})