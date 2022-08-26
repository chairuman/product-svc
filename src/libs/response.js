const { isNil } = require('lodash');
const isFinite = require('lodash/isFinite');

module.exports = {
  pagination: (data) => {
    const {
      page,
      perPage,
      count,
    } = { ...data };

    const totalCount = isFinite(count * 1) && count * 1 > 0 ? Math.floor(count * 1) : 0;
    const validPerPage = isFinite(perPage * 1) && perPage * 1 > 1 ? Math.floor(perPage * 1) : 1;
    const totalPage = Math.ceil(totalCount / validPerPage);
    const currentPage = isFinite(page * 1) && page * 1 > 1 ? Math.floor(page * 1) : 1;
    const hasMore = currentPage < totalPage;
    const nextPage = hasMore ? currentPage + 1 : null;
    const prevPage = currentPage >= 2 ? currentPage - 1 : null;

    return {
      total: totalPage,
      total_data: totalCount,
      current_page: currentPage,
      next_page: nextPage,
      prev_page: prevPage,
      has_more: hasMore,
    };
  },
  successResponse: (res, data = {}, pagination = null, message = 'success') => {
    const results = {
      status_code: 200,
      message,
      data,
    };

    if (!isNil(pagination)) results.pagination = pagination;
    res.status(200).json(results);
  },
  errorResponse: (res, message, statusCode = 500) => {
    const results = {
      status_code: statusCode,
      message,
    };
    res.status(statusCode).json(results);
  },
};
