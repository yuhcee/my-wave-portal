const main = async () => {
    const [owner] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log('Contract address: ', waveContract.address);

    console.log('Contract deployed to : ', waveContract.address);
    console.log('Contract deployed by : ', owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log('Wave count', waveCount.toNumber());

    // Let's send a few waves
    let waveTxn = await waveContract.wave('A message');
    await waveTxn.wait(); // wait for transaction to be mined.

    const [_, randomPerson, anotherRandomPerson] = await hre.ethers.getSigners();

    waveTxn = await waveContract.connect(randomPerson).wave('Another message');
    await waveTxn.wait(); // wait for transaction to be mined

    waveTxn = await waveContract.connect(anotherRandomPerson).wave('Another random message');
    await waveTxn.wait(); // wait for transaction to be mined

    waveCount = await waveContract.getTotalWaves();
    console.log('A total number of %d users waved! => Yayyyy!!! ', waveCount);

    let allWaves = await waveContract.getAllWaves();
    console.log("AllWaves", allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
