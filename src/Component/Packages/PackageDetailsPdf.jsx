import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { APIPath } from "../../Config";

const PackageDetailsPdf=()=>{
    const { packageId, setPackageId, token } = useCart();
    const [packagedata, setPackagedata] = useState(null);
    const [loading, setLoading] = useState(true);
    const Id='658c40632d396a32fe11e2fd';

    useEffect(() => {
        if (packageId) {
            fetch(`${APIPath}/api/v1/packages/?id=${Id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors',
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    // setTimeout(() => {
                    setPackagedata(data.data)
                    setLoading(false)
                    // }, 2000)
                })
                .catch((err) => {
                    alert(err)
                    setLoading(false)
                })
        }
        // else {
        //     navigate('/packages')
        // }

    }, [Id])

    return<>
     {loading ? (<div className="loader"></div>):(
            <div className="packagedetails-for-downalod">
                {packagedata?.map((val, id) => {
                    return <>
                        <div key={id}>
                            <h2>{val.title}</h2>
                            <p>{val.packageOverview}</p>
                            <h4>{val.duration}</h4>
                        </div>
                        <div>
                            <h2>Day Wise Plan</h2>
                            {val.dayWisePlan.map((val, id) => {
                                return <>
                                    <ul key={id}>
                                        <li>{val}</li>
                                    </ul>
                                </>
                            })}
                        </div>
                        <div>
                        <h2>Include Services</h2>
                        {val.includedServices.map((val, id) => {
                            return <>
                               <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    <div>
                        <h2>Exclude Services</h2>
                        {val.excludedServices.map((val, id) => {
                            return <>
                               <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    <div>
                        <h2>Booking Procedure</h2>
                        {val.bookingProcedure.map((val, id) => {
                            return <>
                               <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    <div>
                        <h2>Policy Note</h2>
                        {val.policyNote.map((val, id) => {
                            return <>
                                <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    <div>
                        <h2>Cancellation Refund Policy</h2>
                        {val.cancellationRefundPolicy.map((val, id) => {
                            return <>
                               <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    <div>
                        <h2>MustCarry</h2>
                        {val.mustCarry.map((val, id) => {
                            return <>
                               <ul key={id}>
                                    <li>{val}</li>
                                </ul>
                            </>
                        })}
                    </div>
                    </>
                })}

            </div>
        )}
    </>
}
export default PackageDetailsPdf;