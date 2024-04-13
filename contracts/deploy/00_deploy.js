require("hardhat-deploy")
require("hardhat-deploy-ethers")
const { VerifyingKey } = require("maci-domainobjs")

const { ethers } = require("hardhat")
const { Console } = require("console")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

const TREE_ARITY = 5

module.exports = async ({ deployments }) => {
    const { deploy } = deployments

    console.log("Wallet+ Ethereum Address:", wallet.address)
    const Verifier = await deploy("Verifier", {
        from: wallet.address,
        args: [],
        log: true,
    })
    console.log(Verifier.address)
    const treeDepths = {
        intStateTreeDepth: 1,
        messageTreeSubDepth: 1,
        messageTreeDepth: 2,
        voteOptionTreeDepth: 2,
    }

    const VkRegistry = await deploy("VkRegistry", {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(VkRegistry.address)

    const _VkRegistry = new ethers.Contract(VkRegistry.address, VkRegistry.abi, wallet)
    const processVk = VerifyingKey.fromObj({
        protocol: 1,
        curve: 1,
        nPublic: 1,
        vk_alpha_1: [1, 2],
        vk_beta_2: [
            [1, 2],
            [1, 2],
        ],
        vk_gamma_2: [
            [1, 2],
            [1, 2],
        ],
        vk_delta_2: [
            [1, 2],
            [1, 2],
        ],
        vk_alphabeta_12: [[[1, 2, 3]]],
        IC: [[1, 2]],
    })

    // const setVkRegistry = await _VkRegistry.setVerifyingKeys(
    //     10,
    //     treeDepths.intStateTreeDepth,
    //     treeDepths.messageTreeDepth,
    //     treeDepths.voteOptionTreeDepth,
    //     TREE_ARITY ** treeDepths.messageTreeSubDepth,
    //     processVk,
    //     processVk.copy(),
    //     { gasLimit: 1000000 }
    // )
    // await setVkRegistry.wait()

    const PoseidonT3 = await deploy("PoseidonT3", {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(PoseidonT3.address)

    const PoseidonT4 = await deploy("PoseidonT4", {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(PoseidonT4.address)

    const PoseidonT5 = await deploy("PoseidonT5", {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(PoseidonT5.address)

    const PoseidonT6 = await deploy("PoseidonT6", {
        from: wallet.address,
        args: [],
        log: true,
    })

    console.log(PoseidonT6.address)

    const libraries = {
        PoseidonT3: PoseidonT3.address,
        PoseidonT4: PoseidonT4.address,
        PoseidonT5: PoseidonT5.address,
        PoseidonT6: PoseidonT6.address,
    }

    const PollFactory = await deploy("PollFactory", {
        from: wallet.address,
        args: [],
        libraries,
        value: ethers.utils.parseEther("0"),
        log: true,
    })

    console.log(PollFactory.address)

    const TallyFactory = await deploy("TallyFactory", {
        from: wallet.address,
        args: [],
        libraries,
        log: true,
    })

    console.log(TallyFactory.address)

    const MessageProcessorFactory = await deploy("MessageProcessorFactory", {
        from: wallet.address,
        args: [],
        libraries,
        log: true,
    })

    console.log(MessageProcessorFactory.address)

    const MACIFactory = await deploy("MACIFactory", {
        from: wallet.address,
        args: [
            VkRegistry.address,
            {
                pollFactory: PollFactory.address,
                tallyFactory: TallyFactory.address,
                subsidyFactory: ethers.constants.AddressZero,
                messageProcessorFactory: MessageProcessorFactory.address,
            },
            Verifier.address,
        ],
        libraries,
        log: true,
    })

    console.log(MACIFactory.address)

    // Setting the MACI Parameteres for the MicroSize test Circuit
    const _MACIFactory = new ethers.Contract(MACIFactory.address, MACIFactory.abi, wallet)

    const tx = await _MACIFactory.setMaciParameters(10, treeDepths, { gasLimit: 1000000 })

    await tx.wait()
}
