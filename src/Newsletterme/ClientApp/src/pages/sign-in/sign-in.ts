import { Vue } from 'vue-class-component';

export default class SignIn extends Vue {
    public email: string = '';
    public password: string = '';

    public async signIn(): Promise<void> {
    }
}