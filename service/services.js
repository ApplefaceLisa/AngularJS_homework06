angular.module("customServices", [])
.factory("pagerService", function() {
    // service definition
    var service = {};
    service.getPager = getPager;
    return service;

    // service implementation
    /* generate array of number from start(inclusive) to end(inclusive) */
    function range(start, end) {
        return Array.from(Array(end-start+1), (_, i) => start + i);
    }

    /* @totalItems : total number
     * @currentPage
     * @pageSize
    */
    function getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var halfSize = Math.floor(pageSize / 2);

        var startPage, endPage;
        if (totalPages <= pageSize) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= halfSize + 1) {
                startPage = 1;
                endPage = pageSize;
            } else if (currentPage + halfSize > totalPages) {
                startPage = totalPages - pageSize + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfSize;
                endPage = currentPage + halfSize - 1;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
});