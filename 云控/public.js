module.exports = {
    //保存本地数据
    setStorageData: function (name, key, value) {
        const storage = storages.create(name);  //创建storage对象
        storage.put(key, value);
    },

    //读取本地数据
    getStorageData: function (name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            return storage.get(key);
        };
        //默认返回undefined
    },

    //删除本地数据
    delStorageData: function (name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            storage.remove(key);
        };
    },
};