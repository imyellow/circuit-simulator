declare module 'ant-design-vue/es/*';
declare module 'vue-loader/lib/plugin';
declare module 'progress-bar-webpack-plugin';

declare module '@antv/g2/lib/core' {
    import G2 from '@antv/g2/lib/index';
    export default G2;
}
