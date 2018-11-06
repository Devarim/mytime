
<template>
    <transition-group name="list-complete" tag="ul" class="lista list-complete">
        <slot></slot>
    </transition-group>
</template>
<script>
export default {
  name: 'TransitionList',
}
</script>


<style lang="scss">

.list-complete > li {
    display: block;
    width: 100%;
    transition: all .2s;  
    opacity: 1;
}

.list-complete-leave-active {
    height: 50px;
}
.list-complete-enter-leave-active {
    animation: bounce-out .2s;
}
.list-complete-leave-to {
    transform: scale(0);
    transform: translateY(-100%);
    height: 0px;
    opacity: 0;
    transition: all .1s;
}
.list-complete-enter-active {
    animation: bounce-in .2s;
}
.list-complete-enter-to {
    transform: scale(1);
}

.list-complete-move {
    transition: transform .2s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    75% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes opacity-in {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
