export class ApiBaseParams {

  /*
   * Add _gte or _lte for getting a range
   *
   * GET /posts?views_gte=10&views_lte=20
   * Add _ne to exclude a value
   *
   * GET /posts?id_ne=1
   * Add _like to filter (RegExp supported)
   *
   * GET /posts?title_like=server
   */

  _page?: string;
  _limit?: string;
  _embed?: string;
  q?: string;

  [column: string]: any;
}
