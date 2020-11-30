import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage=(p)=> {
    if(p&& p.ratings){
        let ratingsArray= p && p.ratings;
        let total=[];
        let len= ratingsArray.length;
        
        ratingsArray.map((rating)=>total.push(rating.star));
        let totalReduced=total.reduce((p,n)=>p+n,0);

        let highest=len*5;
        let res=(totalReduced*5)/highest;
        return(
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating  starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    editing={false} rating={res}/>
                    {" "}
                    ({p.ratings.len})
                </span>
            </div>
        )
    }
    };


