

var replay_txt = Array(
    "承诺本来就是男人与女人的一场角力，有时皆大欢喜，大部份的情况却两败俱伤。",
    "我们害怕岁月，却不知道活着是多么的可喜。我们认为生存已经没意思，许多人却正在生死之间挣扎。甚么时候，我们才肯为自己拥有的一切满怀感激?",
    "明知会失去自由，明知这是一生一世的合约，为了得到对方，为了令对方快乐，也甘愿作出承诺。恋爱?一个追求不自由的过程，当你埋怨太不自由了的时候，就是你不爱他的时候。",
    "我们放下尊严,放下个性,放下固执,都只是因为放不下一个人。",
    "只有守得住秘密的人，才能得到更多的秘密。",
    "当你的眼泪忍不住要流出来的时候，睁大眼睛，千万别眨眼，你会看到世界由清晰到模糊的全过程。",
    "生活，是用来经营的，而不是用来计较的。感情，是用来维系的，而不是用来考验的!",
    "女人分为结婚与不结婚两种,男人分为自愿结婚与被-迫结婚两种。",
    "女性在所有礼物中，认为花朵最有价值是因为：男性在送花给女性的时候必须克服那种把花拿在手上走在街道上的羞涩感觉。",
    "男人之间最沉重的话题就是说到自己的女人，而男人之间最轻松的话题，就是说到别人的女人。",
    "知识是一种使求知者吃得越多越觉得饿的粮食。",
    "站在山顶和站在山脚下的两人，虽然地位不同，但在对方眼里，同样的渺校",
    "使我们不快乐的，都是一些芝麻小事，我们可以躲闪一头大象，却躲不开一只苍蝇。",
    "格式化自己，就是为了删除你。",
    "毁灭友情的方式有许多，最彻底的一种是借钱!(借钱容易还钱难，救急不救穷，借钱请慎重)",
    "保持青春的秘诀，是有一颗不安分的心。",
    "什么是浪漫?就是明知她不喜欢你，依然送朵玫瑰花给她。什么是浪费?就是明知她喜欢你，还送朵玫瑰花给她。",
    "有钱的捧个钱场，没钱的回家取点钱来捧个钱常",
    "人生为棋，我愿为卒，行动虽慢，可谁见我都会后退一步。",
    "装傻这事，如果干的好，就叫大智若愚;木讷这事，如果干的好，就叫深沉。",
    "在事实面前，我们的想像力越发达，后果就越不堪设想。",
    "人有三样东西无法掩盖：咳嗽、贫穷和爱，越想隐瞒，就越欲盖弥彰。",
    "如果背叛是一种勇气，那么接受背叛需要更大的勇气。",
    "脑袋空不要紧，关键是不要进水。",
    "男人的使命神圣而坚定：一是保卫祖国!二是听自己女人的话。",
    "记忆像是掌心里的水，不论你摊开还是紧握，终究还是会从指缝中一滴一滴流淌干净。",
    "不怕讨债的是英雄，就怕欠债的是真穷。",
    "最可怕的生活不是今天不知道明天怎样，而是现在就看到了自己一生的全部，而且无法改变。",
    "对一个朋友信任的深浅，不是看你会不会对他笑，而是看你愿不愿意当着他的面哭。",
    "小时候觉得自己的父亲不简单，后来觉得自己不简单，再后来觉得自己的孩子不简单!",
    "男人和老婆的关系再差，和岳母的关系也是好的;女人和老公的关系再好，和婆婆的关系也是差的。",
    "人犯错误，大半是该用真情时太过动脑筋，而在该用脑筋时又太感情用事。",
    "自由不是做你想做的，而是可以不做你不想做的。",
    "不要害怕诱-惑，你抵制了它，说明你是个好人;抵制失败了，说明你曾经是个好人……",
    "骆驼不流泪是因为它知道水的珍贵;女孩不流泪是因为还没有找到值得流泪的人。",
    "失恋时，即使看见两条直直的铁轨，也会不由自主地把它想象成两行泪痕，流向天边。",
    "罗马人凯撒大帝，威震欧亚非三大陆，临终告诉侍者说：“请把我的双手放在棺材外面，让世人看看，伟大如我凯撒者，死后也是两手空空。",
    "你可以用自己不喜欢的方式赚到财富，也可以用自己不相信的药治好疾病，但你无法从自己不爱的人身上获得幸福。",
    "幸运之神的降临，往往只是因为你多看了一眼，多想了一下，多走了一步。",
    "所谓美女三分长相七分打扮;所谓气质三分才气七分装蒜;所谓温柔三分忍让七分压抑!",
    "哲学家不是法定的，当你想同一件事情超过分秒，你就成了哲学家。",
    "男人戒烟就跟女人减肥一样，永远都有明天。",
    "爱情有时很像醉酒的感觉，头脑明明是清醒的，但行为就是不受控制。",
    "当一个人谁都不爱的时候，他就可以爱上身边的任何一个人。",
    "所谓情话，就是你说了一些连自己都不相信的话，却希望对方相信。",
    "一个成熟的人往往发觉可以责怪的人越来越少，因为人人都有难处。",
    "离开我就别安慰我，要知道每一次缝补也会遭遇穿刺的痛。",
    "时尚很容易，让你的装饰物的价值超过你的内在价值，你就时尚了",
    "假如你想要一件东西，就放它走。它若能回来找你，就永远属于你;它若不回来，那根本就不是你的。",
    "一个人会落泪，是因为痛;一个人之所以痛，是因为在乎;一个人之所以在乎，是因为有感觉;一个人之所以有感觉，仅因为你是一个人!所以，你有感觉，在乎，痛过，落泪了，说明你是完整不能再完整的一个人。难过的时候，原谅自己，只不过是一个人而已，没有必要把自己看的这么坚不可摧。",
    "如果真的有一天，某个回不来的人消失了，某个离不开的人离开了，也没关系。时间会把最正确的人带到你的身边，在此之前，你所要做的，是好好的照顾自己。",
    "你可以沉默不语，不管我的着急;你可以不回信息，不顾我的焦虑;你可以将我的关心，说成让你烦躁的原因;你可以把我的思念，丢在角落不屑一顾。你可以对着其他人微笑，你可以给别人拥抱，你可以对全世界好，却忘了我一直的伤心。------你不过是仗着我喜欢你，而那，却是唯一让我变得卑微的原因。",
    "生命中有一些人与我们擦肩了，却来不及遇见;遇见了，却来不及相识;相识了，却来不及熟悉;熟悉了，却还是要说再见。------对自己好点，因为一辈子不长;对身边的人好点，因为下辈子不一定能遇见。",
    "【人的一生】岁出场，岁成长，岁彷徨，岁定向，岁打拼，岁回望，岁告老，岁搓麻，岁晒太阳，岁躺床上，岁挂墙上。生的伟大，死的凄凉，能牵手的时候，请别肩并肩，能拥抱的时候，请别手牵手，能相爱的时候，请别说分开。一生就这么短暂而已。",
    "时候，希望自己快点长大，长大了，却发现遗失了童年;单身时，开始羡慕恋人的甜蜜，恋爱时，怀念单身时的自由。———很多事物，没有得到时总觉得美好，得到之后才开始明白：“我们得到的同时也在失去。”",
    "面对，不一定最难过。孤独，不一定不快乐。得到，不一定能长久。失去，不一定不再拥有。不要因为寂寞而错爱，不要因为错爱而寂寞一生。——【徐志摩】",
    "能够慢慢培养的不是爱情，而是习惯。能够随着时间得到的，不是感情而是感动。所以爱是一瞬间的礼物，有就有，没有就没有。但反过来说，爱和婚姻实际并不是一回事情，并不是所有的爱情都要结婚的，也不是所有婚姻都有爱情的。",
    "在这个世界上，没有人真正可以对另一个人的伤痛感同身受。你万箭穿心，你痛不欲生，也仅仅是你一个人的事，别人也许会同情，也许会嗟叹，但永远不会清楚你伤口究竟溃烂到何种境地。",
    "别再为错过了什么而懊悔。你错过的人和事，别人才有机会遇见，别人错过了，你才有机会拥有。人人都会错过，人人都曾经错过，真正属于你的，永远不会错过。",
    "因为有你，我认真过，我改变过，我努力过，我悲伤过…我傻，为你傻;我痛，为你痛;深夜里，你是我一种惯性的回忆…我不想在为过去而挣扎，我不想在为过去而努力，我不想在为思念而牵挂，可这些都只是不想，我做不到。",
    "在google上输入“故事”，可以得到条结果，但输入“结局”，却只能得到条结果。可见，并不是每个故事，都有结局。",
    "做一个快乐的女子，一定要快乐,不快乐也要制造快乐，笑容不一定能使世界绽放，却可放松紧绷的胸膛，开心，就笑，让大家都感染到，悲伤，就哭，美容，倾诉，然后一切归零，爽朗，对内心卑微的自己笑笑，汲取安慰和力量，信赖，神清气爽，然后可以轻舞飞扬，生活，其实没有什么大不了。",
    "有些事，明知是错的，也要去坚持，因为不甘心;有些人，明知是爱的，也要去放弃，因为没结局;有时候，明知没路了，却还在前行，因为习惯了。",
    "怕被伤害的人，永远抓不到真正的幸福;怕伤害别人的人，永远都会被别人有意无意的伤害。",
    "他们说，别幼稚了，稳重一点。他们都说得没错，可是，我可不可以，最后一次重温儿时的快乐。然后从此丢弃那颗童真的心，做大家都希望我做的，成熟而稳重的人。我一直想知道，倘若他们看到,那一刻，我如此快乐的表情，还会不断地催我成长，让我成熟吗?",
    "有时候，我们感觉走到了尽头，其实只是心走到了尽头。再深的绝望，都是一个过程，总有结束的时候，回避始终不是办法。鼓起勇气昂然向前，或许机遇就在下一秒。几米说过，我总是在最深的绝望里，看见最美的风景。",
    "对待爱人最残忍的方式，不是爱恨交织，不是欺骗背叛，而是在极致的疼爱之后，逐渐淡漠的爱。",
    "爱情里，总有一个主角和一个配角，累的永远是主角，伤的永远是配角;有时，爱也是种伤害：残忍的人，选择伤害别人，善良的人，选择伤害自己;人生就是一种承受，需要学会支撑。支撑事业，支撑家庭，甚至支撑起整个社会，有支撑就一定会有承受，支撑起多少重量，就要承受多大压力。",
    "真正爱你的人，一下子说不出真正爱你的理由，只知道自己顾不上注意别人;真正爱你的人，总是惹你生气，你却发觉不了他到底做错了什么;真正爱你的人，只会在你一个人面前流泪;真正爱你的人，会在你忘记回复他短信时狠狠地说你一顿;真正爱你的人，很少当面赞美你，可是心里肯定你是最棒的。",
    "如果我不在乎你，我不会在为你笑;不会变得这么脆弱;不会在意你做的每件事;不会静静的想着你发呆;不会记住你说的每句话;不会为你心痛;不会自己一人珍惜与你在一起的时刻;不会总是不由自主的想起你;不会这么轻易的让痛苦折磨自己;不会为了无关重要的小细节跟你争执;这一切只因为我在乎你。",
    "如果有一天我不再烦你，如果有一天，你的生活中没有了我，没有了每天的电话，每天的留言，每天的关心，每天的小小脾气。我把一切一切都表现了出来，你知道了，清楚了，了解了，最终感动了，可是我却离开了。今天陌生的，是昨天熟悉的……",
    "我怀念的不是你，而是你给的致命曾经。、碎了一地的诺言，拼凑不回的昨天。、最疼的疼是原谅，最黑的黑是绝望。、是你苍白了我的等待，讽刺了我的执着。、沿途的风景，我只能边走边忘。、我们始终都在练习微笑，终于变成不敢哭的人。、曾经海枯石烂，抵不过好聚好散。",
    "如果有一天，你要离开我，我不会留你，我知道你有你的理由;如果有一天，你说还爱我，我会告诉你，其实我一直在等你;如果有一天，我们擦肩而过，我会停住脚步，凝视你远去的背影，告诉自己那个人我曾经爱过。或许人一生可以爱很多次，然而总有一个人可以让我们笑得最灿烂，哭得最透彻，想得最深切。",
    "无论生活得多么艰难，最后你总会找到一个让你心甘情愿傻傻相伴的人。",
    "每个人都有一个死角，自己走不出来，别人也闯不进去。我把最深沉的秘密放在那里。你不懂我，我不怪你。每个人都有一道伤口，-或深或浅我把最殷红的鲜血涂在那里。-你不懂我，我不怪你。每个人都有一行眼泪，喝下的冰冷的水，酝酿成的热泪。我把最心酸的委屈汇在那里。你不懂我，我不怪你。",
    "你的过去我来不及参与，你的未来我奉陪到底。",
    "我也有辛酸苦楚，不说罢了。我也有执念不放，不说罢了。我也有千回百转，不说罢了。我不是装傻卖乖，不说罢了。不是我未看见，不是我没想过，不是我不懂得，只是不说罢了。",
    "当你仍想继续，永远不要说再见;当你还能承受，永远不要说放弃;当你舍不得一个人，永远永远不要说你不再爱他/她。",
    "如果，在身边的最后真的不是你。如果经历了那么多坎坷辗转后，最终还是要分开。如果故事到最后，是我们的身边都有了别的人。如果回忆，诺言和曾经相爱的决心都在现实面前变得渺小，不堪一击。不管以后如何，不管结局如何。现在的我还是愿意执着的去爱。------我们一起等我们的最后，最后的最后。",
    "喜欢一个人，在一起时会很开心;爱一个人，在一起时会莫名的失落。喜欢一个人，永远是欢乐;爱一个人，你会常常流泪。喜欢一个人，当你想起他会微微一笑;爱一个人，当你想起他会对着天空发呆。喜欢一个人，是看到了他的优点;爱一个人，是包容了他的缺点。------喜欢，是一种心情;爱，是一种感情。",
    "愿你是那只刺猬，我予你柔软的拥抱，你予我鲜血淋漓的爱。",
    "沉默是一个女孩最大的哭声。总有一个人，一直住在心底，却消失在生活里。",
    "女人，你总是那么害怕离别，却总是假装坚强;女人，你总是那么害怕黑夜，却总是暗自躲藏;女人，你总是那么害怕独处，却总是孤单一人;女人，你总是那么容易付出，明知是痛苦，却还那么执着;女人，你总是那么容易受伤，明知是欺骗，却还自欺欺人;女人，你怎么总是那么傻，让人心疼。",
    "常常会在不经意间想起曾经的某个人，不是忘不了，而是放不下。那些不愿再向任何人提起的牵挂，在黑暗的角落里潜滋暗长。总是在不懂爱的时候遇见了不该放弃的人，在懂得爱以后却又偏偏种下无意的伤害遇见某个人才真正读懂了爱的含义;错过某个人，才真正体会到了心痛的感觉。",
    "你，一个最重要的过客，之所以是过客，因为你未曾会为我停留。曾经在我人生中撒下欢乐的种子，之所以只是种子而不开花，因为你未曾为它浇水施肥。曾经划下我人生中的一根伤痕，之所以有伤痕，因为你未曾温柔地怜悯过。曾经给我一线的光明而瞬间带来全部的黑暗，之所以灰暗，因为你未曾想过为我照亮。",
    "我们一直觉得妥协一些、将就一些、容忍一些可以得到幸福，但当你的底线放得越低，你得到的就是更低的结果。------不要总抱怨自己遇到的人都不靠谱，如果别人总这么对你，那么一定是你教会了别人用这样的方式对你。------爱是平等的，可以付出更多，也可以爱他更多，但决不是妥协、将就、容忍。",
    "时间，让深的东西越来越深，让浅的东西越来越浅。看的淡一点，伤的就会少一点，时间过了，爱情淡了，也就散了。------别等不该等的人，别伤不该伤的心。我们真的要过了很久很久，才能够明白，自己真正怀念的，到底是怎样的人，怎样的事。",
    "炊烟起了，我在门口等你。夕阳下了，我在山边等你。叶子黄了，我在树下等你。月儿弯了，我在十五等你。细雨来了，我在伞下等你。流水冻了，我在河畔等你。生命累了，我在天堂等你。我们老了，我在来生等你。能厮守到老的，不只是爱情，还有责任和习惯。",
    "柏拉图名言：，若爱，请深爱，如弃，请彻底，不要暧昧，伤人伤己。，人生最遗憾的，莫过于轻易地放弃了不该放弃的，固执地坚持了不该坚持的。，说，我以为小鸟飞不过沧海，是因为小鸟没有飞过沧海的勇气，十年以后我才发现，不是小鸟飞不过去，而是沧海的那一头，早已没有了等待。",
    "记住,不是眼泪就可以挽回失去的,所以不要轻易流下你的泪;记住,不是伤心就一定要哭泣,所以不要那么吝啬你的微笑;记住,不是你认为可以给予就给予,所以不要那么轻易许下承诺;记住,不是你做的不够好,所以不要悲悯的以为自己一事无成;记住,不是只有你一个人在努力,所以不要轻易的就放弃。",
    "如果坦白是一种伤害，我选择谎言。如果谎言也是伤害，我选择沉默。",
    "在第一次选择坚强的时候，一定要想清楚：你是否做好了承受一切的准备。因为一旦你选择了坚强，即使只是假装的，你也必须一直坚持下去。因为你曾经的坚强会让人以为即使再大的苦，你也撑得祝",
    "每个人都有孤独的时候。要学会忍受孤独，这样才会成熟起来。年轻人嘻嘻哈哈、打打闹闹惯了，到了一个陌生的环境，面对形形色色的人和事，一下子不知所措起来，有时连一个可以倾心说话的地方也没有。这时，千万别浮躁，学会静心，学会忍受孤独。在孤独中思考，在思考中成熟，在成熟中升华。不要因为寂寞而乱了方寸，而去做无聊无益的事情，白白浪费了宝贵的时间。",
    "不要像玻璃那样脆弱。有的人眼睛总盯着自己，所以长不高看不远;总是喜欢怨天尤人，也使别人无比厌烦。没有苦中苦，哪来甜中甜?不要像玻璃那样脆弱，而应像水晶一样透明，太阳一样辉煌，腊梅一样坚强。既然睁开眼睛享受风的清凉，就不要埋怨风中细小的沙粒。",
    "管住自己的嘴巴。不要谈论自己，更不要议论别人。谈论自己往往会自大虚伪，在名不副实中失去自己。议论别人往往陷入鸡毛蒜皮的是非口舌中纠缠不清。每天下班后和你的那些同事朋友喝酒聊天可不是件好事，因为，这中间往往会把议论同事、朋友当做话题。背后议论人总是不好的，尤其是议论别人的短处，这些会降低你的人格。",
    "机会从不会“失掉”，你失掉了，自有别人会得到。不要凡事在天，守株待兔，更不要寄希望于“机会”。机会只不过是相对于充分准备而又善于创造机会的人而言的。也许，你正为失去一个机会而懊悔、埋怨的时候，机会正被你对面那个同样的“倒霉鬼”给抓住了。没有机会，就要创造机会，有了机会，就要巧妙地抓祝",
    "、若电话老是不响，你该打出去。很多时候，电话会给你带来意想不到的收获，它不是花瓶，仅仅成为一种摆设。交了新朋友，别忘了老朋友，朋友多了路好走。交际的一大诀窍就是主动。好的人缘好的口碑，往往助你的事业更上一个台阶。",
    "千万不要因为自己已经到了结婚年龄而草率结婚。想结婚，就要找一个能和你心心相英相辅相携的伴侣。不要因为放纵和游戏而恋爱，不要因为恋爱而影响工作和事业，更不要因一桩草率而失败的婚姻而使人生受阻。感情用事往往会因小失大。",
    "写出你一生要做的事情，把单子放在皮夹里，经常拿出来看。人生要有目标，要有计划，要有提醒，要有紧迫感。一个又一个小目标串起来，就成了你一生的大目标。生活富足了，环境改善了，不要忘了皮夹里那张看似薄薄的单子。",
    "永远也不要记恨一个男人，毕竟当初，他曾爱过你，疼过你，给过你幸福。永远不要说这个世界上再也没有好男人了，或许明天，你就会遇到爱你的那个男人，在你眼里，他再坏也是好。其实，分手之后没必要记恨，更没必要自暴自弃。爱情不属于固定的两个人。"
);

var sendText = Array(
    "我是你的粉丝，通过一下",
    "同一个社群里面的",
    "看到你的分享，找你学习交流",
    "你头像看起来气质很不错，可以认识一下吗？"
);

var photoText = Array(
    "一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。",
    "那些爱耍心眼的人 ，麻烦离我远点，我们不是一路人。",
    "男人辉煌以后:他会记住两个人,一个是当初瞧不起他抛弃他的人,一个是一直陪他走到今天的人！",
    "再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。",
    "不管做什么，都不要急于回报，因为播种和收获不在同一个季节，中间隔着的一段时间，我们叫它为‘坚持’ 。",
    "是你的东西，谁都抢不走，不属于你的，有了也会丢。",
    "人生就像英雄联盟，不管你天赋有多强，符文有多高，谁先起来谁是王！",
    "年轻的泪水不会白流,痛苦和骄傲这一生都要拥有。",
    "融不进去的圈子别硬融，做不了的事别硬做，你也是人，不必讨好全世界。",
    "有的人，认识了一辈子，也没有走进心里！因为，总是一张虚伪的脸！有的人，",
    "只认识了几天，就好像相识了好多年！因为，亮出的心你能看见！交朋友，不要做一个看脸的人，",
    "而要做一个看心的人，外表怎样，都无关紧要，内心真诚，才至关重要，处感情，不要做一个玩心的人，",
    "而要做一个用心的人，玩人一时，玩不了一世，于人真诚，心安一辈子，人与人之间，最需要一份情，情与情之间最需要一份真……"
);

function arrRadom(arr){    
    return arr[random(0,arr.length-1)]
}


function tulingapi(txt){
    try{
        var tuling123api = "http://www.tuling123.com/openapi/api?key=c1d246d4d9b743a5bbe406346c1ac9bd&info=";
        tuling123api = tuling123api + txt
        var resdata = http.get(tuling123api)
        log(resdata)
        var resTexT = JSON.parse(resdata.body.string()).text;
        return resTexT
    }catch(err){
        toast("图灵接口报错")
    }
}


log('脚本开始');


function logs(text,toastKey){
    log(text);
    if (toastKey){
        toast(text);
    }
}

function active(appbid,timess){
    var frintbids = currentActivity();
    log(frintbids)
    var frintbids = frintbids.search(appbid)
    if( frintbids == 0 ){
        log("在前端");
        return true;
    }else{
        log("启动App");
        app.launch(appbid);
        if (!timess){timess = 1;}
        sleep(1000*timess)
        return false;
    }
}

var id_ = 'id';
var text_ = 'text';
function jsclick(way,txt,clickKey,n){
    if(!n){n=1}
    if(!clickKey){clickKey=false}
    if (way == "text"){
        var txtddd = text(txt).findOne(200);
    }else if(way == "id"){
        var txtddd = id(txt).findOne(200);
    }
    if(txtddd){
        // log(txtddd);
        // log(txtddd.id());
        // log(txtddd.text());
        log("找到->", txt)
        if (clickKey){
            log('准备点击->',txt)
            log("x:",txtddd.bounds().centerX(),"y:",txtddd.bounds().centerX())
            // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
            Tap(txtddd.bounds().centerX(),txtddd.bounds().centerY());
            sleep(1000*n)
        }
        return true
    }else{
        log("没有找到->",txt)
    }
}

function input_(txt){
    input(txt)
    sleep(1000*1)
}

function replay(){
    if (jsclick(id_,"amh",true,1)){
        log('找到,编辑')
        // var replayText = tulingapi('你是谁?')
        // if ( !replayText) {
            replayText = arrRadom(replay_txt)
        // }
        input_( replayText );
        sleep(1000*2)
        if (jsclick('text','发送',true,1)){
            sleep(1000 * random(3,5))
            sleep(1000);
        }
    }
    back_bottom();
}

function wechat_send(){
    var ret = false
    if (jsclick(id_,"amh",true,1)){
        log('找到,编辑')
        replayText = arrRadom(replay_txt)
        input_( replayText );
        sleep(1000*2)
        if (jsclick('text','发送',true,1)){
            sleep(1000 * random(3,5))
            sleep(1000);
        }
        ret = true
    }
    back_bottom();
    return ret
}

var message_lun = 0
function news_message(){
    message_lun++
    if (message_lun%2 == 0 ){
        return jsclick('id','nf',true,3) 
    }else{
        return jsclick('id','mv',true,3)
    }
}

function back_bottom(){
    log('search back');
    if (jsclick('id',"kx",true,2)){
        // 小米6 腾讯新闻后退
    }else if(jsclick('id','km',true,2)){
        //小米6后退
    }else if(jsclick('id','k1',true,2)){
        // google 后退
    }else if(jsclick('id','kb',true,2)){
        // google 新闻后退
    }else if(jsclick('text','我知道了',true,2)){
        // 弹出来我知道的了提示
    }else if(jsclick('text','允许',true,2)){
        // 允许
    }else{
        log('没有后退');
        return true
    }
}

// 读微信信息
function readInfo(){
    var timeLine = 0
    var outTimes = 50
    while ( timeLine < outTimes ){
        if ( jsclick("text","设置",false,1) && jsclick("text","我",false,1) ){
            log('我的界面');
            var nikename = id('dcf').findOne(200).text()
            log(nikename)
            return nikename;
        }else if(jsclick("text","我",true,1)){
        }else{
            back_bottom();
        }
        sleep(1000);
        timeLine++
    }
}

// 添加通讯录好友
function addfriends(){
    var timeLine = 0
    var outTimes = 20
    var sendKey = false

    while ( timeLine < outTimes ){

        if ( jsclick("text","通讯录",true,1) && jsclick("text","新的朋友",false,1) ){
            log('通讯录界面');
            jsclick("text","新的朋友",true,1)
        }else if( jsclick('text',"手机联系人",true,5) ){
        }else if( sendKey && jsclick('text',"发送",true,3) ){
        }else if( jsclick('text',"查看手机通讯录",false,2) ){
            log('查看手机通讯录')

            var uc = className("TextView").find();
            for(var i = 0; i < uc.length; i++){
                var tv = uc[i];
                if (wechatInfo['addTimes'] < wechatInfo['addmunber']){
                    if(tv.text() == "添加"){
                        log(tv.text());
                        click(tv.bounds().centerX(),tv.bounds().centerY());
                        sleep(1000*3)
                        if ( className("EditText").findOne(1000)) {
                            className("EditText").findOne(1000).setText(arrRadom(sendText))
                            jsclick('text',"发送",true,3)
                            back_bottom();
                        }
                        wechatInfo['addTimes']++
                    }else{
                        log(tv.text() )
                    }
                }else{
                    wechatInfo['addKey'] = false;
                    return true
                }
            }
            
            // if(jsclick("text","添加",true,2)){
            //     sendKey = true
            // }

        }else if( jsclick("text","新的朋友",false,1) &&  jsclick("text","添加朋友",false,1)  ){
            jsclick("text","添加朋友",true,2)
        }else{
           if( back_bottom() ){
            jsclick("text","允许",true,2)
           }
        }
        sleep(1000);
        timeLine++
    }
}

// 发朋友圈
function addphoto(){
    var timeLine = 0
    var outTimes = 50
    var sendKey = false

    while ( timeLine < outTimes ){

        if ( jsclick("text","发现",true,1) && jsclick("text","朋友圈",false,1) ){
            log('朋友圈界面');
            jsclick("text","朋友圈",true,1)


        }else if(  jsclick('text',"发表",false,2) ){
            className("EditText").findOne(1000).setText(arrRadom(photoText))
            sleep(random(1000,2000))
            if (jsclick('text',"发表",true,random(5,15))){
                sendKey = true
            }

        }else if(  jsclick('text',"从相册选择",true,2) ){
        }else if(  jsclick('text',"图片和视频",false,2) ){
            
            var uc = id("bou").find();
            var maxLength = 8
            if (uc.length > maxLength){
                maxLength = 8
            }else{
                maxLength = uc.length
            }
            for(var i = 0; i < maxLength; i++){
                var tv = uc[i];
                log(tv.click())
                sleep(random(1000,2000))
            }

            textMatches("/完成.*/").findOne(200).click()
            sleep(random(3000,5000))

        }else if( descMatches("/.*我的头像,再点一次可以进入我的相册/").findOne(200) && className('android.support.v7.widget.LinearLayoutCompat').findOne(200) ){
            log('有相机按钮')
            if (sendKey ){
                wechatInfo['addphotoKey'] = false
                return true
            }
            var crarra = className('android.support.v7.widget.LinearLayoutCompat').findOne(200)
            if (crarra){
                // click(crarra.bounds().centerX(),crarra.bounds().centerY())
                Tap(crarra.bounds().centerX(),crarra.bounds().centerY())
                sleep(1000)
            }
        }else{
           if( back_bottom() ){
            jsclick("text","允许",true,2)
           }
        }
        sleep(1000);
        timeLine++
    }
}





function Fwechat(){
    var Home_Time_Line = Math.round(new Date())
    var wehcat_Times = 0
    var send_one = true
    while (wehcat_Times < 50){
        log("wehcat_Times",wehcat_Times)
        var wechatBid = "com.tencent.mm"
        if (active(wechatBid,5)){
            // 微信在前端
            if (jsclick('text','我',false,1) && jsclick('text','微信',true,1) ){
                // 微信首页
                log("微信首页");
                if ( wechatInfo['addKey'] ){
                    addfriends();
                }else if(wechatInfo['addphotoKey'] ) {
                    addphoto();
                }else if(send_one){

                    Tap(540,random(480,960))
                    sleep(1000*3)
                    if (wechat_send()){
                        send_one = false;
                    }
                
                }else if (news_message()){
                    replay();
                }
    


            }else{
                if (back_bottom()){
                    Tap(50,100);
                }
            }
        }
    
        if ( Math.round(new Date()) - Home_Time_Line > 60*1000+random(1000,5000) ){
            home();
            Home_Time_Line = Math.round(new Date())
            sleep(1000*random(2,5))
        }

        sleep(1000*1);
        wehcat_Times++;
    }
    log("超时")
}

var wechatInfo = Array();
// wechatInfo['nikename'] = readInfo();
wechatInfo['addKey'] = false
wechatInfo['addTimes'] = 0
wechatInfo['addmunber'] = 2
wechatInfo['addphotoKey'] = false

// Fwechat()


function gifshow_back_bottom(){
    log('search back');
    if (jsclick('id',"back_btn",true,2)){
    }else if (jsclick('id',"left_btn",true,2)){
        // 小米6 腾讯新闻后退
    }else if(jsclick('text','我知道了',true,2)){
        // 弹出来我知道的了提示
    }else if(jsclick('text','允许',true,2)){
        // 允许
    }else{
        log('没有后退');
        Tap(50,80)
        return true
    }
}




function Fgifshow(){
    Fgifshow_i = 0
    while (Fgifshow_i < 20){
        log("Fgifshow_i",Fgifshow_i)
        var appbid = "com.smile.gifmaker";
    
        if ( currentActivity() == "com.yxcorp.plugin.live.LivePlayActivity" ) {
    
            if ( gifshow_Info['SetRoom'] == gifshow_Info['room'] ){
                if( jsclick("id","live_close",false,1) && jsclick("text","说点什么...",false,1) ){
                    log('正在直播界面')
                    
                    jsclick("text","说点什么...",true,2)
                    // input_(gifshow_Info['word'])
                    className("EditText").findOne(1000).setText(gifshow_Info['word'])
                    if (jsclick("text","发送",true,random(1,5))){
                        return true
                    }
                }
            }else{
               if( !jsclick("id","live_close",true,1)  ) {
                gifshow_back_bottom()
               }
            }
    
        }else if (currentActivity().search("com.yxcorp.gifshow") ==  0 ){
            // 微信在前端
            if (jsclick('text','发现',false,1) && jsclick('text','同城',false,1) ){
                // 微信首页
                log("快手首页");
                jsclick("id","left_btn",true,2)
    
            }else if(jsclick('text',"设置",false,1) && jsclick('text',"查找",true,2)){
            }else if(jsclick("text","取消",false,1) && jsclick("id","editor",false,1) ){
                log("展开搜索页面")
                if (jsclick("text","综合",false,1) && jsclick("text","用户",false,1)){
                    if ( className("EditText").findOne(200).text() == gifshow_Info['room'] ){
                        if (jsclick("text","关注",true,1)){
                        }else if(jsclick("id","avatar",true,2)){
                            gifshow_Info['SetRoom'] = gifshow_Info['room']
                        }
                    }else{
                        jsclick("text","取消",true,1)
                    }
                }else{
                    log("展开搜索页面","没有找到综合")
                    className("EditText").findOne(1000).setText(gifshow_Info['room'])
                    // input_(gifshow_Info['room'])
                    if(jsclick("id","candidates",true,3)){
                        // gifshow_Info['SetRoom'] = gifshow_Info['room']
                    }
                }
            }else if(   className("EditText").findOne(200)  && id("inside_editor_hint").findOne(200) ){
                log("准备搜索")
                jsclick("id","inside_editor_hint",true,2)
            }else if( textMatches("/.*作品/").findOne(200) && textMatches("/.*说说/").findOne(200) ){
                log("作品界面")
                log(  "gifshowSetRoom-->" , gifshow_Info['SetRoom'] )
                if ( gifshow_Info['SetRoom'] == gifshow_Info['room'] ){
                    // if ( id("player_cover_container").findOne(200).children().length >= 2  ){
                    //     log('正在直播')
                    //     jsclick("id","player_cover_container",true,2)
                    // }else{
                    //     //暂未直播
                    //     return false;
                    // }

                    jsclick("id","player_cover_container",true,3)

                }else{
                    gifshow_back_bottom()
                }
            }else{
                if (gifshow_back_bottom()) {
                    Tap(50,100);
                }
            }
        }else{
            active(appbid,8)
        }
    
        sleep(1000 * 1);
        Fgifshow_i++;
    }
}



var gifshow_Info = Array()
gifshow_Info['room']="683729885"
gifshow_Info['SetRoom']=""
gifshow_Info['word']="666->有好的男装推荐吗?"

// Fgifshow()





function upscreen(){
    var ra = new RootAutomator();
    ra.swipe( 600 + random(-50,50), 1300, 600 + random(-50,50), 1300-800, 500,1)
}

function toudiao_back(){
    log("头条其它->找弹窗")
    if ( jsclick("text","以后再说",true,2)){
    }else if( jsclick("text","允许",true,2)){
    }else{
        // var button = className("ImageView").find()
        // if (button.length = 2){
        //     Tap(button[1].bounds().centerX(),button[1].bounds().centerY())
        // }else{
            log("后退一次")
            back();
            return true;
        // }
    }
}

function FliteJr(){

    var jrtimeLine = 0
    var check_login = true
    var check_look = false
    var look_news = 0
    var look_times = 0
    var look_timesKey = 0

    var money = 0
    var goold = 0
    var giftMa = ""

    while (jrtimeLine < 50){
        var appbid = "com.ss.android.article.lite";
        log("头条 jrtimeLine--->",jrtimeLine)
        if ( currentActivity().search(appbid) == 0 ){
            if (jsclick('text',"首页",false,1)  &&  jsclick('text',"未登录",true,2)){
                logs("暂未登录",true)
                var logbotton = textMatches("/登录.*/").findOne(500)
                if(logbotton){
                    Tap(logbotton.bounds().centerX(),logbotton.bounds().centerY())
                }
            
            }else if (jsclick("text","首页",false,1) && jsclick("text","推荐",false,1)){
                if (jsclick("text","任务",true,5)){
                    Tap( 930,1708 )
                    sleep(1000*3)
                    var TET = descMatches("/我知道了.*/").findOne(500)
                    if (TET){
                        Tap(TET.bounds().centerX(),TET.bounds().centerY())
                    }
                    var TET = descMatches("/javascript.*/").findOne(500)
                    if (TET){
                        Tap(TET.bounds().centerX(),TET.bounds().centerY())
                    }
                    toudiao_back();
            
                }else if(jsclick("text","关注",false,1)){
                    sleep(500)
                    check_login = false
                    //有 我的就是登录成功了
                    if (look_news < random(3,5)){
                        upscreen()
                        sleep(random(1000,3000))
                        upscreen()
                        sleep(random(1000,3000))
                    }else{
                        if(jsclick("text","首页",true,1)){
                            sleep(1000*5+1000*random(1,2))
                        }
                        look_news = 0
                    }
    
                    var titlett = className("TextView").find();
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            // log(i,titlett[i].text())
                            sleep(200)
                        }



                        var news_mun = random(28,titlett.length - 1)
                    
                        Tap(titlett[news_mun].bounds().centerX(),titlett[news_mun].bounds().centerY())
                        check_look = true
                        look_timesKey = random(20,30)
                        look_times = 0
                        sleep(1000*random(3,5))
                        look_news++
                    }
                    sleep(1000*3)
                    //准备点击一个新闻
                    // 查看第几个新闻呢

                }else{
                    jsclick("text","首页",true,1)
                }

    

            }else if (jsclick("text","我的",false,1) && jsclick("text","首页",true,1)){
            }else{
                toudiao_back()
            }

        }else if( currentActivity().search("com.ss.android.article")==0 ){
            log('详情页面')

            if (look_times < look_timesKey && check_look &&  textMatches("/写评论.*/").findOne(200)){
                upscreen()
                sleep(random(200,1000))

                if ( jsclick("text","已显示全部评论",false,1) ){
                    toudiao_back()
                }
                look_times++

            }else{
                toudiao_back()
            }
        }else if (currentActivity().search("com.ss.android") == 0){
            if ( jsclick("text","登录立即领红包",false,1) ){
                if(YM_get_phone()){
                    text("手机号").findOne(500).setText(YM_arr.phone);
                    jsclick("text","获取验证码",true,3)
                    var get_sms = 0
                    while (get_sms < 25){
                        if ( YM_get_message() ){
                            text("请输入验证码").findOne(500).setText(YM_arr.message);
                            sleep(1000*3)
                            jsclick("text","进入头条",true,2)
                            break;
                        }
                        get_sms++
                        sleep( 1000*4 )
                    }
                }
            }else{
                toudiao_back()
                back();
            }
        }else{
            active(appbid,5)
            var imges = className("ImageView").find();
            if (imges){
                if(imges.length == 2){
                    Tap(imges[1].bounds().centerX(),imges[1].bounds().centerY())
                }
            }
        }

        sleep(1000 * 1);
        jrtimeLine++;
    }

    var jrtimeLine = 0
    while (jrtimeLine < 30 ){
        jrtimeLine++
        if (jsclick("text","首页",false,1) && jsclick("text","我的",true,1)){

            if (jsclick('text',"去领钱",false,1)){
                var all_Info = className("TextView").find()
                if (all_Info){
                    for (var i = 0;i<all_Info.length;i++){
                        log(i,all_Info[i].text())
                        if (all_Info[i].text() == "元"){
                            money = all_Info[i-1].text()
                            goold = all_Info[i+2].text()
                            giftMa = all_Info[i-3].text()
                            break;
                        }
                    }
                }
                log(money,goold,giftMa)
                return money,goold,giftMa
            }
        }else{
            if (toudiao_back()){
                var imges = className("ImageView").find();
                if (imges){
                    if(imges.length == 2){
                        Tap(imges[1].bounds().centerX(),imges[1].bounds().centerY())
                    }
                }
            }
        }
    }
}

function Fdy(urlss){

    var timeLine = 0
    app.openUrl(urlss);
    sleep(1000*8)
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        if ( currentActivity().search("com.android.browser") == 0 ){
            var dkkk =  desc("打开看看").findOne(200)
            if (dkkk){
                Tap( dkkk.bounds().centerX(),dkkk.bounds().centerY() + 50)
                log(  dkkk.bounds().centerX(),dkkk.bounds().centerY() )
            }else{
               var open = className("EditText").findOne(200)
               if (open){
                   Tap(988,784)
                   sleep(1000*2)
                   Tap(1005,956)

                   sleep(1000*2)
                   log('完成')
                   return true
               }
            }
        }else{
            active(appbid,8)
        }
        sleep(1000 * 1);
        timeLine++;
        log('--')
    }
}


var urlss = "http://v.douyin.com/6Nk4B6/";
// Fdy(urlss)


var KF_url = "http://api.ygcake.com/do.php";
var KF_arr = Array();
KF_arr.token = "176ac85b-bad7-4f68-8d96-b0f89e71bb09"
KF_arr.sid = "10305"
KF_arr.phone = ""
KF_arr.message = ""


function KF_login(){
    var postData = Array();
    postData.action = "loginIn";
    postData.name = "s-cgy5paih";
    postData.password = "yangmian121";
    postData.author = "yangmian";

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = KF_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "1"  ){
            KF_arr.token = Msg_Data_arr[1];
            log( KF_arr.token )
            return true
        }
    }
}

function KF_get_phone(){
    var postData = Array();
    postData.action = "getPhone";
    postData.sid = KF_arr.sid;
    postData.token = KF_arr.token;
    postData.author = "yangmian";
    postData.vno = 0;

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = KF_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "1"  ){
            KF_arr.phone = Msg_Data_arr[1];
            log( KF_arr.phone )
            return true
        }
    }
}

function KF_get_message(){
    var postData = Array();
    postData.action = "getMessage";
    postData.sid = KF_arr.sid;
    postData.token = KF_arr.token;
    postData.phone = KF_arr.phone;
    postData.author = "yangmian";

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = KF_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "1"  ){
            KF_arr.message = Msg_Data_arr[1];
            KF_arr.message =  Msg_Data_arr[1].match(/\d{4,6}/)[0]
            log( KF_arr.message )
            return true
        }
    }
}


var YM_url = "http://api.fxhyd.cn/UserInterface.aspx"
var YM_arr = Array();
YM_arr.token = "00827051be8fe3b8661bd351aaaa83d18c55735d0301"
YM_arr.itemid = "7732"
YM_arr.phone = ""
YM_arr.message = ""

function YM_login(){
    var postData = Array();
    postData.action = "login";
    postData.username = "ouwen000";
    postData.password = "wenhong520";

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = YM_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "success"  ){
            YM_arr.token = Msg_Data_arr[1];
            log( YM_arr.token )
            return true
        }
    }

}

function YM_get_phone(){
    var postData = Array();
    postData.action = "getmobile";
    postData.itemid = YM_arr.itemid;
    postData.token = YM_arr.token;
    postData.excludeno = "170.171.180";

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = YM_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "success"  ){
            YM_arr.phone = Msg_Data_arr[1];
            log( YM_arr.phone )
            return true
        }
    }

}

function YM_get_message(){
    var postData = Array();
    postData.action = "getsms";
    postData.itemid = YM_arr.itemid;
    postData.token = YM_arr.token;
    postData.mobile = YM_arr.phone;
    postData.release = 1;

    var pastdata = ""
    for ( var key in postData ){
        pastdata = pastdata + key + "=" + postData[key] + "&"
    }

    log(pastdata)
    var True_Url = YM_url + "?" + pastdata
    log(True_Url)

    var Msg_Data = http.get(True_Url)
    if ( Msg_Data ){
        var Msg_Data = Msg_Data.body.string()
        log(Msg_Data)
        Msg_Data_arr = Msg_Data.split("|");
        if (  Msg_Data_arr[0] == "success"  ){
            YM_arr.message = Msg_Data_arr[1];
            YM_arr.message =  Msg_Data_arr[1].match(/\d{4,6}/)[0]
            log( YM_arr.message )
            return true
        }
    }
}



log(

    currentActivity()

)


function Fhttp_get(urls_,datas){

    var getdatas = ""
    var True_Url = ""
    for (var key_ in datas){
        getdatas = getdatas + key_ + "=" + datas[key_] + "&"
    }
    True_Url = urls_ + "?" + getdatas
    log(True_Url)
    var r = http.get(True_Url);
    var r_ = r.body.string();
    var r__ = JSON.parse(r_);
    log(r__)
    return r__

}

var device_Info = Array();
device_Info.imei = device.getIMEI();
device_Info.task_phoneimei = device.getIMEI();
device_Info.model = device.model;
device_Info.name = "wenfree";
device_Info.tag = "02";

var Get_Task_Api_Url = "http://admin.hiei.xin/api.php/Index/Task_get"

function F_get_task(){
    try{
        log(device_Info)
        var task_data = Fhttp_get(Get_Task_Api_Url,device_Info)
        if ( task_data.ret == 200 ){
            if ( task_data.data != "暂无任务" ){
                return task_data.data
            }
        }
    }catch(err){
        log("err",err)
    }
}

function Fdyactive(){
    active("com.ss.android.ugc.aweme",10)
    jsclick("text","同意",true,3)
    jsclick("text","好的",true,3)
    jsclick("text","允许",true,3)
    jsclick("text","我知道了",true,3)
    sleep(random(1000,3000))
    upscreen()
    sleep(random(1000,3000))
    upscreen()
    sleep(random(1000,3000))
    upscreen()
}

function Fdyreg(){
    YM_arr.itemid = "7732"
    var appbid = "com.ss.android.ugc.aweme"
    var outimes = random(100,200)
    var TimeLine = 0
    var loginKey = false
    while ( TimeLine < outimes ){
        if (active(appbid,5)){
            if(jsclick("text","我",true,3)){
                if (loginKey){
                    return true
                }
            }else if(jsclick("text","密码登录",false,1)){

                var phoneEdite = text("输入手机号码").findOne(200)
                if(phoneEdite){
                    if(  YM_get_phone() ){
                        phoneEdite.setText(YM_arr.phone)
                        sleep(1000*2)
                        jsclick("text","获取验证码",true,3)
                        var time__ = 0
                        while (time__ < 25){
                            time__++
                            if (YM_get_message()){
                                var smsEdite = text("输入短信验证码").findOne(200)
                                if(smsEdite){
                                    smsEdite.setText(YM_arr.message)
                                }
                                
                                var goubutton = textMatches("/我已阅读.*/").findOne(100)
                                if(goubutton){
                                    Tap(216,1137)
                                }

                                sleep(1000*3)
                                var loginbotton = className("Button").findOne(200)
                                if(loginbotton){
                                    Tap(loginbotton.bounds().centerX(),loginbotton.bounds().centerY())
                                }
                            
                                sleep(1000*3)
                                break;
                            }else{
                                sleep(1000*3)
                                
                            }
                        }
                    }else{
                        sleep(1000*5)
                    }

                }else{
                    Tap(50,80)
                }

            }else if(jsclick("text","跳过",true,1)){
                loginKey = true
            }
        }

        jsclick("text","同意",true,3)
        jsclick("text","我知道了",true,3)
        TimeLine++
        sleep(1000)
    }
}


function up_Auto_js(){
    try{
        var httpv = http.get("http://test.hiei.xin/updatescript.php")
        httpv = JSON.parse(httpv.body.string())
        if (httpv["version"] > localv ){
            log("准备更新")
            upAutojs();
            exit();
        }else{
            log("无需更新")
            return true
        }

    }catch(err){
        toast("更新报错")
    }
}

function upAutojs(){
    app.sendBroadcast(
        {
        packageName: "org.autojs.autojs",
        className: "org.autojs.autojs.ScriptBroadCast",
        }
    );
}


function All(){

    //设置更新时间线
    var up_time = 50
    var change = 2


    while ( true ){
        log("~")
        var Task_Day = new Date()
        var Task_hour = Task_Day.getHours()
        var Task_minutes = Task_Day.getMinutes()
        var minutes_Key = random(2,12)

        if( Task_minutes > 8 ){
            minutes_Key = 0
        }

        if ( Task_hour >= 8 && Task_hour < 24  && Task_minutes > minutes_Key  ){   

            //是否更新时间记录值
            up_time++
            log("up_time",up_time)

            if ( up_time > 10 ){
                // 每11轮 执行一次是否更新
                // up_time = 0;
                up_Auto_js();
            }
        
            //  取任务
            var Task_data = F_get_task()
            if ( Task_data ){
                gifshow_Info['room'] = Task_data.Property.task_room
                gifshow_Info['word'] = Task_data.Property.task_word
                //  有任务执行快手
                Fgifshow()
            }else{
                // 启动其它的轮数
                change++
                if (change%3==0){
                    FliteJr();
                }else if(change%3==1){
                    Fwechat();
                }else if(change%3==2){
                    Fdyactive()
                }
            }
            sleep(1000*6)
        }else{
            //时间结束
            log("时间不对")
            Home();
            sleep(1000*30);
        }
    }//死循环

} //All 全部循环

var localv = 26

var Task_Day = new Date()
var Task_hour = Task_Day.getHours()
var Task_minutes = Task_Day.getMinutes()
var minutes_Key = random(2,12)



while (true){
    try{
        All();
    }catch(err){
        toast("err"+err)
    }
    
}


function openUrls(urls_){
    app.openUrl(urls_)
    sleep(1000*10)
}

function downApp(urls_){
    app.openUrl(urls_)
    sleep(1000*10)

    var TimeLine_down = 0
    while (TimeLine_down < 100){
        jsclick("text","同意并使用",true,2)
        jsclick("text","立即下载",true,2)
        jsclick("text","安装",true,2)
        jsclick("text","仅允许一次",true,2)
        jsclick("text","仅安装一次",true,2)
        jsclick("text","确定",true,2)
        if(jsclick("text","打开",false,2)){
            return true
        }
        sleep(1000*3)
    }

}

var open_nine_Game_Url = "http://www.jiuyao666.com/index.php/index/index/appid/2/tgid/cc0004612"
var nine_Game = "http://download.jiuyao.yuzhuagame.com/index.php/Index/down/?appid=2&tgid=cc0004612&type=1"



function nine_game(){
    YM_arr.itemid = "34941"
    var appbid = "cn.jyhy.tg.xingyao"

    var TimeLine = 0

    while ( TimeLine < 100 ){

        if ( currentActivity() == "com.zqhy.app.core.view.main.MainActivity" ){
            if( jsclick("text","BT版",false,1) && jsclick("text","赚金",true,2)){
    
            }else if(jsclick("text","请点击登录/注册",true,2)){
    
            }else if(textMatches("/玩家.*/").findOne(200)){
                return true;
            }
    
        }else if( currentActivity() == "com.zqhy.app.core.view.login.LoginActivity"){
            if (jsclick("text","快速注册",true,2)){
    
            }else{
                var phones = text("请输入11位手机号").findOne(200)
                if (phones){
                    if (YM_get_phone()){
                        phones.setText(YM_arr.phone)
                        jsclick("text","获取验证码",true,4)
                        id("et_phone_password").findOne(200).setText("AaDd112211")
                        var Get_sms_timeLine = 0
                        while ( Get_sms_timeLine < 25){
                            Get_sms_timeLine++
                            if ( YM_get_message() ){
                                text("请输入验证码").findOne(200).setText(YM_arr.message)
                                sleep(1000)
                                jsclick("text","立即注册",true,5)
                                break;
                            }else{
                                sleep(1000*3)
                            }
                        }
                    }else{
                        sleep(3000*2)
                    }
                }
            }
        }else{
            active(appbid,5)
        }
        TimeLine++
    }
}



// up_Auto_js()

// openUrls(open_nine_Game_Url)
// downApp(nine_Game)
// nine_game()



















