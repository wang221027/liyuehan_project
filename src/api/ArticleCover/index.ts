import request from "@/utils/request";
import qs from "qs";
enum API {
  // 获取文章列表
  ReqArticleCover = "/getArticleCover",
  PubComment = "/pubComment",
  getAllComments = "/getAllComments",
}
// 获取文章列表
export const ArticleCover = (id: number) =>
  request.get(API.ReqArticleCover + `?id=${id}`);
// 发布评论
export const pubComment = (comment) =>
  request.post(API.PubComment, qs.stringify(comment));
export const reqAllComments = (id) =>
  request.get(API.getAllComments + `?id=${id}`);
