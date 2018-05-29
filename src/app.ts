import * as childProcess from 'child_process';
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

commander
    .command('update')
    .action((command: any) => {
        const currentDirectoryPath: string = path.resolve('./');

        const packageFileContents: string = fs.readFileSync(path.join(currentDirectoryPath, 'package.json'), 'utf8');

        const packageFileJSON: any = JSON.parse(packageFileContents);

        const dependenciesUpdateCommand: string = Object.keys(packageFileJSON.dependencies).map((key: string) => `${key}@latest`).join(' ');

        const devDependenciesUpdateCommand: string = Object.keys(packageFileJSON.devDependencies).map((key: string) => `${key}@latest`).join(' ');

        const dependenciesUpdateCommandProcess = childProcess.execSync(`npm install --save ${dependenciesUpdateCommand}`);

        console.log(dependenciesUpdateCommandProcess.toString());

        const devDependenciesUpdateCommandProcess = childProcess.execSync(`npm install --save-dev ${currentDirectoryPath} ${devDependenciesUpdateCommand}`);

        console.log(devDependenciesUpdateCommandProcess.toString());
    });

commander.parse(process.argv);
