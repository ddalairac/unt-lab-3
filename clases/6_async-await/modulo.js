export async function callTo(name){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(name == "Gostbusters")
                resolve("resolve, help is comming");
            else
                reject("reject, you should call to Gostbusters")
        }, 1000);
    })
}

export async function askForHelp(hero){
    try {
        let result = await callTo(hero);
        console.log(result)
    } catch (error) {
        console.log(error)
        askForHelp("Gostbusters");
    }
}

// askForHelp("Police");

// console.log("Log sincronico")


// // o exportar todo junto
// export {callTo, askForHelp}


