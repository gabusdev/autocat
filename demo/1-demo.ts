import { AutoCatLogger, AutoCatPipeline, AutoCatTask } from "../src";

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

const pipeline = new AutoCatPipeline<StoreType>("test", new AutoCatLogger());

pipeline.add((store, logger) => {
    logger.info(store.text)
    store.text += "world"
    return store
}).add((store, logger) => {
    logger.info(store.text)
    return store
}).add(afunction(3))
    .add(taskFunction)



pipeline.run({
    text: "hello"
})

