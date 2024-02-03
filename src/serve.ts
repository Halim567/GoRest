function getFlagValue (command: string[], flag_name: string): string | null {
    const flag = command.findIndex(f => f.startsWith(`--${flag_name}`));

    return flag > -1 ? command[flag].split(`--${flag_name}:`)[1] : null;
}

const command = process.argv.slice(2);

if (command.length > 4) {
    console.error("Perintah tidak dikenali");
    process.exit(1);
}

switch(command[0]) {
    case "membuat-file":
        const type_file = getFlagValue(command, "type");
        const nama_file = getFlagValue(command, "name");
        const konten_file = getFlagValue(command, "content");

        if (!type_file || !nama_file || !konten_file) {
            console.error("Flag '--type:', '--name:', dan '--content:' harus disertakan");
            break;
        }

        switch(type_file) {
            case "txt":
                Bun.write(nama_file.concat(".txt"), konten_file);
                console.log(`Berhasil membuat file ${nama_file}.txt`);

                break;
            case "json":
                try {
                    const json_konten = JSON.parse(konten_file);

                    Bun.write(nama_file.concat(".json"), JSON.stringify(json_konten, null, 2));
                    console.log(`Berhasil membuat file ${nama_file}.json`);
                } catch(err) {
                    console.error("Konten JSON tidak valid");
                }

                break;
            default:
                console.error("Tipe file tidak dikenali");
        }

        break;
    case "membaca-file":
        const dir = getFlagValue(command, "dir");

        if (!dir) {
            console.error("Flag '--dir:' harus disertakan");
            break;
        }

        try {
            const text = Bun.file(dir);
            console.log(await text.text());
        } catch(err) {
            console.error("Directory tidak diketahui");
        }

        break;
    default:
        console.error("Perintah tidak dikenali");
}