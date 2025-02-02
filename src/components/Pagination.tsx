import React, { Component } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

class Pagination extends Component<PaginationProps> {
  handlePageClick = (page: number) => {
    this.props.onPageChange(page);
  };

  renderPageNumbers = () => {
    const { totalPages, currentPage } = this.props;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => this.handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  render() {
    return <div className="pagination">{this.renderPageNumbers()}</div>;
  }
}

export default Pagination;
