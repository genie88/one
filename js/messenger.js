/**
 * 事件侦听、广播、单播
 * @method
 * @example
        //创建频道“unameChange”
        Messenger.createChannel('unameChange');
        //创建频道“uname.change”---天然支持“伪”命名空间！！！
        Messenger.createChannel('uname.change');

        //添加unameChange的监听者“updateTray”
        Messenger.add('unameChange', 'updateTray', function(){
            //TODO
        });
        //添加unameChange的监听者“changeFootbar”
        Messenger.add('unameChange', 'changeFootbar', function(){
            //TODO
        });
        //发出广播
        Messenger.broadcast('unameChange', someData);
        //发出广播
        Messenger.broadcast('uname.change', someData);
        //发出单播
        Messenger.unicast('uname.change', 'changeFootbar', someData);
 */
var Messenger;
!function(){
    if(Messenger){
        return;
    }
    var _channels = {},
        slice = Array.prototype.slice;

    Messenger = {
        //channelName 频道名，天然支持“伪”命名空间。例如：uname.change
        createChannel: function(channelName){
            if( _channels[channelName] ){
                traceError('Channel "'+channelName+'" has been defined!');
            }else{
                _channels[channelName] = {};
            }
        },
        //channelName 监听频道
        //listenerName 监听者
        //handler 发生广播时的执行函数
        add: function(channelName, listenerName, handler){
            var channel = _channels[channelName];
            if( !channel ){
                // try to new a channel
                channel = _channels[channelName] = {};
            }
            if( channel[listenerName] ){
                traceError(channelName+':'+listenerName+'" has been defined!');
                return;
            }
            channel[listenerName] = handler;
        },

        //全局广播
        broadcast: function(channelName/*, data...*/){
            var channel = _channels[channelName];
            if( channel ){
                for(var p in channel){
                    if( channel[p] ){
                        channel[p].apply(null, slice.call(arguments,1));
                    }
                }
            }
        },

        //广播给指定监听者
        unicast: function(channelName, listenerName/*, data...*/){
            var channel = _channels[channelName];
            if( channel && channel[listenerName]){
                channel[listenerName].apply(null, slice.call(arguments,2));
            }
        },
        //channelName 频道名
        //listenerName 可选，如果没有，将删除整个频道
        remove: function(channelName, listenerName){
            var channel = _channels[channelName];
            if( channel ){
                if(listenerName){
                    channel[listenerName] = null;
                    delete channel[listenerName];
                }else{
                    channel = null;
                    delete _channels[channelName];
                }
            }
        }
        
    };

}();