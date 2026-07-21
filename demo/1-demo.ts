import { AutoCatLogger, AutoCatPipeline, AutoCatTask } from "../src";

type StoreType = {
    text: string
}

const afunction = (a: number): AutoCatTask<StoreType> => {

    return (store, logger) => {
        store.text += a.toString()
        logger.info(store.text)
        return store
    }
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



pipeline.run({
    text: "hello"
})

