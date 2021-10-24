import { Options, Vue } from 'vue-class-component';
import Header from './header/header.vue';
import { signUp } from '@/services/user';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

@Options({
    components: {
        'app-header': Header
    },
    validations: {
        email: {
            email,
            required
        },
        password: {
            required
        }
    }
})
export default class Home extends Vue {
    public email: string = '';
    public password: string = '';
    public signUpSubmitted: boolean = false;

    v$ = useVuelidate();

    public async signUp(): Promise<void> {
        this.signUpSubmitted = true;
        // signUp(this.email, this.password);
    }
}