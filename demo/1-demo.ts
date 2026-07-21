import { ConsoleAutoCatLogger, AutoCatPipeline, AutoCatScheduler, AutoCatTask, AutoCatException } from "../src";

type StoreType = {
    text: string
}

const afunction = (a: number) => {

    const z: AutoCatTask<StoreType> = (store, logger) => {
        store.text += a.toString()
        logger.info(store.text)
        return store
    }
    return z
}

const taskFunction: AutoCatTask<StoreType> = (store, logger) => {
    store.text += "zz"
    logger.info(store.text)
    return store
}

const pipeline = new AutoCatPipeline<StoreType>("test", new ConsoleAutoCatLogger());

pipeline.add((store, logger) => {
    logger.info(store.text)
    store.text += "world"
    return store
}).add((store, logger) => {
    logger.info(store.text)
    return store
})
    .add((store, logger) => {
        throw new AutoCatException("error xyz", logger, { skipCurrentPipeline: false, useWarningLog: false })
    }).add(afunction(3))
    .add(taskFunction)



// pipeline.run({
//     text: "hello"
// })

const scheduler = new AutoCatScheduler(pipeline, 1000, () => ({ text: "hello" }))

scheduler.executeOnce()
