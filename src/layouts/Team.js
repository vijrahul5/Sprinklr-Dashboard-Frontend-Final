import React from "react";
import TeamMember from "./TeamMember";
import Loader from "../components/Loader/Loader";
import { useUpdateTeam, useFetchEmployeeTeamData } from "../Api";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

function Team() {
    // Component for accessing team data and their stand ups
    const [loading, data, error] = useFetchEmployeeTeamData(); // Fetches the logged in employee's team data and their stand ups
    const [addError, deleteError, addTeamMember, deleteTeamMember] =
        useUpdateTeam(); // Provides functions for adding or deleting a team member
    if (error !== false) {
        return <h1>{error}</h1>;
    }
    if (deleteError !== false) {
        return <h1>{deleteError}</h1>;
    }
    if (addError !== false) {
        return <h1>{addError}</h1>;
    }
    async function handleAddBtn(e) {
        // Event listener for adding a team member
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".teamForm input").forEach((element) => {
            element.value = "";
        });
        addTeamMember(data);
    }
    async function handleDeleteBtn(e) {
        // Event Listener for deleting a team member
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let key in data) {
            if (data[key] === "") {
                alert("Please Fill In All The Fields");
                return;
            }
        }
        document.querySelectorAll(".teamForm input").forEach((element) => {
            element.value = "";
        });
        deleteTeamMember(data);
    }

    if (loading === true) {
        return <Loader />;
    } else {
        return (
            <>
                <form className="teamForm" onSubmit={handleAddBtn}>
                    <FormControl
                        label={() => "Add Team Member"}
                        className="form-control"
                    >
                        <>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="employeeEmail"
                                className="form-control"
                            />
                            <Button type="submit" className="submit">
                                Add
                            </Button>
                        </>
                    </FormControl>
                </form>
                <form className="teamForm" onSubmit={handleDeleteBtn}>
                    <FormControl
                        label={() => "Delete Team Member"}
                        className="form-control"
                    >
                        <>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="employeeEmail"
                                className="form-control"
                            />
                            <Button type="submit" className="submit">
                                Delete
                            </Button>
                        </>
                    </FormControl>
                </form>
                {data.length !== 0 ? (
                    <ul className="teamStandUpList">
                        {data.map((teamMember) => {
                            return (
                                <TeamMember
                                    key={teamMember.email}
                                    teamMember={teamMember}
                                />
                            );
                        })}
                    </ul>
                ) : null}
            </>
        );
    }
}

export default Team;
