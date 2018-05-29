import * as childProcess from 'child_process';
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

commander
    .command('update')
    .action((command: any) => {
        const currentFilePath: string = process.argv[1];

        const currentDirectoryPath: string = path.dirname(currentFilePath);

        const packageFileContents: string = fs.readFileSync(path.join(currentDirectoryPath, 'package.json'), 'utf8');

        const packageFileJSON: any = JSON.parse(packageFileContents);

        const dependenciesUpdateCommand: string = Object.keys(packageFileJSON.dependencies).map((key: string) => `${key}@latest`).join(' ');

        const devDependenciesUpdateCommand: string = Object.keys(packageFileJSON.devDependencies).map((key: string) => `${key}@latest`).join(' ');

        const dependenciesUpdateCommandProcess = childProcess.execSync(`npm install --prefix ${currentDirectoryPath} ${dependenciesUpdateCommand}`);

        console.log(dependenciesUpdateCommandProcess.toString());

        const devDependenciesUpdateCommandProcess = childProcess.execSync(`npm install --prefix ${currentDirectoryPath} ${devDependenciesUpdateCommand}`);

        console.log(devDependenciesUpdateCommandProcess.toString());
    });

commander.parse(process.argv);
