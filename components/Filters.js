import React, { memo } from "react";

const Filters = ({
  categories,
  priorities,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
}) => {
  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Category</option>
        {categories.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="">Priority</option>
        {priorities.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Filters);
