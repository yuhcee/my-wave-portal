const main = async () => {
    const [owner] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log('Contract deployed to : ', waveContract.address);
    console.log('Contract deployed by : ', owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    const signers = await hre.ethers.getSigners();
    // console.log('Signers =>', signers);
    // console.log('Owner =>', owner);
    // console.log('Random Person =>', randomPerson);
    for (let signer of signers) {
        let waveTxn = await waveContract.connect(signer).wave();
        await waveTxn.wait();
    }

    waveCount = await waveContract.getTotalWaves();
    console.log('A total number of %d users waved! => Yayyyy!!! ', waveCount)
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
