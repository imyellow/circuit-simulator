import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

/** 验证规则接口 */
export interface ValidateRule {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
    validator?(value: string): boolean;
}

@Component
export default class InputVerifiable extends Vue {
    @Prop({ type: String, default: '' })
    readonly value!: string;

    @Prop({ type: String, default: '请输入内容' })
    readonly placeholder!: string;

    @Prop({ type: Number, default: Infinity })
    readonly maxlength!: number;

    @Prop({ type: [Object, Array], default: () => [] })
    readonly rules!: ValidateRule | ValidateRule[];

    $refs!: {
        input: HTMLInputElement;
    };

    /** 组件内部值字符串 */
    txt = this.value;
    /** 当前是否发生错误 */
    isError = false;
    /** 当前错误信息 */
    errorMessage = '';

    validate(value: string = this.txt): boolean {
        const rules = this.rules instanceof Array ? this.rules : [this.rules];

        this.isError = false;
        this.errorMessage = '';

        for (const rule of rules) {
            if (rule.required && !value) {
                this.isError = true;
                this.errorMessage = rule.message || '';
                return (false);
            }

            if (rule.pattern && !rule.pattern.test(value)) {
                this.isError = true;
                this.errorMessage = rule.message || '';
                return (false);
            }

            if (rule.validator && !rule.validator(value)) {
                this.isError = true;
                this.errorMessage = rule.message || '';
                return (false);
            }
        }

        return (true);
    }
    focus() {
        this.$refs.input.focus();
    }
    clear() {
        this.update('');
        this.clearError();
    }
    clearError() {
        this.errorMessage = '';
    }

    @Watch('value')
    private changeValue(nv: string) {
        this.txt = nv;
    }

    private update(value: string): void {
        this.txt = value;
        this.validate(value);
        this.$emit('input', value);
    }
}