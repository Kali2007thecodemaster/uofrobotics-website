import React from 'react';

/** Red scroll hairline under the nav. useDeck drives the transform. */
export default function Progress() {
  return (
    <div className="progress" aria-hidden="true">
      <i id="bar" />
    </div>
  );
}
