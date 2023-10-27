import React from 'react'
import { LoadingToasts } from '../LoadingToasts'
import { AddFoodItemModal } from './AddFoodItemModal'

export const ContentLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingToasts isLoading={false} isError={false} isSuccess={false} />
      {foodItems && addItemVisible ? (
        <AddFoodItemModal closeAddFoodItem={toggleAddItemForm} />
      ) : isSuccess && foodItems ? (
        <>
          <h2>All Food Items</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignContent: "center",
              justifyContent: "space-around",
            }}
          >
            {foodItems && !addItemVisible ? (
              <button style={{ height: "5rem" }} onClick={toggleAddItemForm}>
                Add Food Item
              </button>
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "75vh",
                overflowY: "auto",
                borderRadius: "0.3rem",
              }}
            >
                </div>
                </div>
                </>
  )
}
