import React from "react";
import Loader from "../components/Loader/Loader";
import { useFetchEmployeeStandUp, useUpdateStandUp } from "../Api";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
function StandUp() {
    // Component for Stand Up message submission or editing
    const [loading, data, error] = useFetchEmployeeStandUp(); // Fetches employee's stand up for the day
    const [addError, editError, addStandUp, editStandUp] = useUpdateStandUp(); // Provides functions for adding or deleting stand up

    if (error !== false) {
        return <h1>{error}</h1>;
    }
    if (addError !== false) {
        return <h1>{addError}</h1>;
    }
    if (editError !== false) {
        return <h1>{editError}</h1>;
    }

    function handleSubmit(e) { // Event Listener for adding a standup
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".standUpform input").forEach((element) => {
            element.value = "";
        });
        addStandUp(data);
    }

    function handleEdit(e) {  // Event Listener for editing a standup
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".standUpform input").forEach((element) => {
            element.value = "";
        });
        editStandUp(data);
    }

    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                {data ? (
                    <form className="standUpForm" onSubmit={handleEdit}>
                        
                        <label htmlFor="question1">
                            What work was done yesterday ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question1"
                            defaultValue={data.question1}
                            className="form-control"
                        />
                        <label htmlFor="question2">
                            What is the agenda for today ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question2"
                            defaultValue={data.question2}
                            className="form-control"
                        />
                        <label htmlFor="question3">
                            What work has been done today ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question3"
                            defaultValue={data.question3}
                            className="form-control"
                        />

                        <input
                            type="submit"
                            className="submit btn btn-dark mt-1"
                            value="Edit"
                            id="floatingTextarea"
                        />
                    </form>
                ) : (
                    <form className="standUpForm" onSubmit={handleSubmit}>
                        <label htmlFor="question1">
                            What work was done yesterday ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question1"
                            className="form-control"
                        />
                        <label htmlFor="question2">
                            What is the agenda for today ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question2"
                            className="form-control"
                        />
                        <label htmlFor="question3">
                            What work has been done today ?
                        </label>
                        <input
                            type="textarea"
                            placeholder="Answer"
                            name="question3"
                            className="form-control"
                        />

                        <input
                            type="submit"
                            className="submit btn btn-dark mt-1"
                            value="Submit"
                        />
                    </form>
                )}
            </>
        );
    }
}

export default StandUp;
