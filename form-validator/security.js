/**
 *  JQUERY-FORM-VALIDATOR
 *
 *  @website by 
 *  @license MIT
 *  @version 2.2.85
 */
!function(a,b){"use strict";a.formUtils.addValidator({name:"spamcheck",validatorFunction:function(a,b){var c=b.valAttr("captcha");return c===a},errorMessage:"",errorMessageKey:"badSecurityAnswer"}),a.formUtils.addValidator({name:"confirmation",validatorFunction:function(a,b,c,d,e){var f="",g=b.valAttr("confirm")||b.attr("name")+"_confirmation",h=e.find('[name="'+g+'"]').eq(0);return h?f=h.val():alert('Could not find an input with name "'+g+'"'),a===f},errorMessage:"",errorMessageKey:"notConfirmed"});var c={amex:[15,15],diners_club:[14,14],cjb:[16,16],laser:[16,19],visa:[16,16],mastercard:[16,16],maestro:[12,19],discover:[16,16]},d=!1,e=!1;a.formUtils.addValidator({name:"creditcard",validatorFunction:function(f,g){var h=a.split(g.valAttr("allowing")||"");if(e=a.inArray("amex",h)>-1,d=e&&1===h.length,h.length>0){var i=!1;if(a.each(h,function(a,d){if(d in c){if(f.length>=c[d][0]&&f.length<=c[d][1])return i=!0,!1}else b.console&&console.warn('Use of unknown credit card "'+d+'"')}),!i)return!1}if(""!==f.replace(new RegExp("[0-9]","g"),""))return!1;var j=0;return a.each(f.split("").reverse(),function(a,b){b=parseInt(b,10),a%2===0?j+=b:(b*=2,j+=10>b?b:b-9)}),j%10===0},errorMessage:"",errorMessageKey:"badCreditCard"}),a.formUtils.addValidator({name:"cvv",validatorFunction:function(a){return""===a.replace(/[0-9]/g,"")?(a+="",d?4===a.length:e?3===a.length||4===a.length:3===a.length):!1},errorMessage:"",errorMessageKey:"badCVV"}),a.formUtils.addValidator({name:"strength",validatorFunction:function(b,c){var d=c.valAttr("strength")||2;return d&&d>3&&(d=3),a.formUtils.validators.validate_strength.calculatePasswordStrength(b)>=d},errorMessage:"",errorMessageKey:"badStrength",calculatePasswordStrength:function(a){if(a.length<4)return 0;var b=0,c=function(a,b){for(var c="",d=0;d<b.length;d++){for(var e=!0,f=0;a>f&&f+d+a<b.length;f++)e=e&&b.charAt(f+d)===b.charAt(f+d+a);a>f&&(e=!1),e?(d+=a-1,e=!1):c+=b.charAt(d)}return c};return b+=4*a.length,b+=1*(c(1,a).length-a.length),b+=1*(c(2,a).length-a.length),b+=1*(c(3,a).length-a.length),b+=1*(c(4,a).length-a.length),a.match(/(.*[0-9].*[0-9].*[0-9])/)&&(b+=5),a.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)&&(b+=5),a.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&(b+=10),a.match(/([a-zA-Z])/)&&a.match(/([0-9])/)&&(b+=15),a.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&a.match(/([0-9])/)&&(b+=15),a.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&a.match(/([a-zA-Z])/)&&(b+=15),(a.match(/^\w+$/)||a.match(/^\d+$/))&&(b-=10),0>b&&(b=0),b>100&&(b=100),20>b?0:40>b?1:60>=b?2:3},strengthDisplay:function(b,c){var d={fontSize:"12pt",padding:"4px",bad:"Very bad",weak:"Weak",good:"Good",strong:"Strong"};c&&a.extend(d,c),b.bind("keyup",function(){var b=a(this).val(),c="undefined"==typeof d.parent?a(this).parent():a(d.parent),e=c.find(".strength-meter"),f=a.formUtils.validators.validate_strength.calculatePasswordStrength(b),g={background:"pink",color:"#FF0000",fontWeight:"bold",border:"red solid 1px",borderWidth:"0px 0px 4px",display:"inline-block",fontSize:d.fontSize,padding:d.padding},h=d.bad;0===e.length&&(e=a("<span></span>"),e.addClass("strength-meter").appendTo(c)),b?e.show():e.hide(),1===f?h=d.weak:2===f?(g.background="lightyellow",g.borderColor="yellow",g.color="goldenrod",h=d.good):f>=3&&(g.background="lightgreen",g.borderColor="darkgreen",g.color="darkgreen",h=d.strong),e.css(g).text(h)})}});var f=function(b,c,d,e,f){var g=c.valAttr("req-params")||c.data("validation-req-params")||{},h=function(b,d){b.valid?c.valAttr("backend-valid","true"):(c.valAttr("backend-invalid","true"),b.message&&c.attr(e.validationErrorMsgAttribute,b.message)),c.valAttr("has-keyup-event")||c.valAttr("has-keyup-event","1").bind("keyup change",function(b){9!==b.keyCode&&16!==b.keyCode&&a(this).valAttr("backend-valid",!1).valAttr("backend-invalid",!1)}),d()};g||(g={}),"string"==typeof g&&(g=a.parseJSON(g)),g[c.valAttr("param-name")||c.attr("name")]=d,a.ajax({url:b,type:"POST",cache:!1,data:g,dataType:"json",error:function(a){return h({valid:!1,message:"Connection failed with status: "+a.statusText},f),!1},success:function(a){h(a,f)}})},g=function(){return!1};a.formUtils.addValidator({name:"server",validatorFunction:function(b,c,d,e,h){var i=c.valAttr("backend-valid"),j=c.valAttr("backend-invalid"),k=document.location.href;return c.valAttr("url")?k=c.valAttr("url"):"serverURL"in d&&(k=d.backendUrl),i?!0:j?!1:"keyup"===a.formUtils.eventType?null:a.formUtils.isValidatingEntireForm?(h.bind("submit",g).addClass("validating-server-side").addClass("on-blur"),c.addClass("validating-server-side"),a.formUtils.haltValidation=!0,f(k,c,b,d,function(){h.removeClass("validating-server-side").removeClass("on-blur").get(0).onsubmit=function(){},h.unbind("submit",g),c.removeClass("validating-server-side"),c.valAttr("value-length",b.length),a.formUtils.haltValidation=!1,h.trigger("submit")}),null):(h.addClass("validating-server-side"),c.addClass("validating-server-side"),f(k,c,b,d,function(){h.removeClass("validating-server-side"),c.removeClass("validating-server-side"),c.trigger("blur")}),null)},errorMessage:"",errorMessageKey:"badBackend",validateOnKeyUp:!1}),a.formUtils.addValidator({name:"letternumeric",validatorFunction:function(b,c,d,e){var f="^([a-zA-Z0-9ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",g="]+)$",h=c.valAttr("allowing"),i="";if(h){i=f+h+g;var j=h.replace(/\\/g,"");j.indexOf(" ")>-1&&(j=j.replace(" ",""),j+=e.andSpaces||a.formUtils.LANG.andSpaces),this.errorMessage=e.badAlphaNumeric+e.badAlphaNumericExtra+j}else i=f+g,this.errorMessage=e.badAlphaNumeric;return new RegExp(i).test(b)},errorMessage:"",errorMessageKey:"requiredFields"}),a.fn.displayPasswordStrength=function(b){return new a.formUtils.validators.validate_strength.strengthDisplay(this,b),this}}(jQuery,window);