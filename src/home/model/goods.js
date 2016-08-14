'use strict';
/**
 * model
 */
export default class extends think.model.relation {
  init(...args){
    super.init(...args);
    this.relation = {
      cover: {
        type: think.model.HAS_MANY, //relation type
        model: "", //model name
        name: "pic_url", //data name
        key: "id", 
        fKey: "g_id", //forign key
        field: "url",
        where: "",
        order: "",
        limit: "",
        rModel: "",
        rfKey: ""
      },
      gooddetail: {
        type: think.model.HAS_MANY,
        key: 'id',
        fKey: 'g_id'
      }
    };
  }

  async getTopCover(){
    let ids = await this.model('goods').setRelation(false).order('g_sold desc').limit(5).field('id').select();
    let urls = [];
    for(let i = 0; i < ids.length; i++){
      urls[i] = await this.model('cover').where({'g_id': ids[i].id}).field('url').limit(1).select();
    }
    return urls;
  }

  async getGoodsType(){
    let data = await this.model('goodstype').setRelation(false).select();
    console.log(data);
  }
}