import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import * as _ from "lodash";

const createRange = (pagingInfo) => {
    if (pagingInfo.totalPages === 2) return _.range(0, 2);
    if (pagingInfo.totalPages === 3) return _.range(0, 3);
    if (pagingInfo.totalPages < 4) return _.range(0, 3);
    if (pagingInfo.totalPages === pagingInfo.page) return _.range(Math.max(pagingInfo.page - 3, 0), pagingInfo.totalPages);
    else _.range(Math.max(pagingInfo.page - 2, 0), Math.min(pagingInfo.totaPages, pagingInfo.page + (pagingInfo.page === 1) ? 2 : 1));
}

const createPages = (range, paging, url) => {
    return _.map(range, index => {
        return (<PaginationItem key={index} disabled={paging.page === index + 1}>
            <PaginationLink href={url + `?offset=${index*paging.limit}`}>{index + 1}</PaginationLink>
        </PaginationItem>)
    });
}

const Paging = ({paging, url}) => {
    return paging.totalPages > 1 ?
            (<Pagination>
                <PaginationItem disabled={paging.page === 1}>
                    <PaginationLink first  href={url}><i className="tim-icons icon-double-left"></i></PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={paging.page === 1}>
                    <PaginationLink previous href={url + `?offset=${(paging.page - 2)*paging.limit}`}>
                        <i className="tim-icons icon-minimal-left" />
                    </PaginationLink>
                </PaginationItem>
                {createPages(createRange(paging), paging, url)}
                <PaginationItem disabled={paging.page === paging.totalPages}>
                    <PaginationLink next href={url + `?offset=${paging.page*paging.limit}`}>
                        <i className="tim-icons icon-minimal-right" />
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={paging.page === paging.totalPages}>
                    <PaginationLink last href={url + `?offset=${(paging.totalPages - 1)*paging.limit}`}>
                        <i className="tim-icons icon-double-right" /></PaginationLink>
                </PaginationItem>
            </Pagination>) : '';
}

export default Paging;
