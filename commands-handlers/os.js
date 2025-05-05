import { EOL, cpus, userInfo, arch } from 'os';

export async function osHandler(param) {
    try {
        switch(param) {
            case '--EOL':
                console.log(JSON.stringify(EOL));
                break;

            case '--cpus':
                const models = cpus().map(({ model, speed}) => {
                    return {
                        model,
                        speed: speed / 1000
                    }
                });
                console.log(models);
                break;

            case '--homedir':
                const { homedir } = userInfo();
                console.log(homedir);
                break;

            case '--username':
                const { username } = userInfo();
                console.log(username);
                break;

            case '--architecture':
                console.log(arch());
                break;

            default:
                throw new Error();
        }
    }
    catch(_error) {
        console.log('Property name is incorrect or not exist. Please check');
    }
}