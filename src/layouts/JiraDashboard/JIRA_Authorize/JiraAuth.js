import React, { useState } from "react";
import useAuthorize from "./useAuthorize";
import { Button, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

const JiraAuth = () => {
    const { showAuthPage, getTokens } = useAuthorize();
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    let URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=jiiaa&response_type=code&prompt=consent`;
    console.log(clientId);
    console.log(clientSecret);
    return (
        <div className="jiraAuth">
            <FormControl label={() => "JIRA Client Id"} caption={() => ""}>
                <Input
                    id="input-id"
                    value={clientId}
                    placeholder="Enter Client Id"
                    onChange={(event) => setClientId(event.currentTarget.value)}
                />
            </FormControl>
            <FormControl label={() => "JIRA Secret Id"} caption={() => ""}>
                <Input
                    id="input-id"
                    value={clientSecret}
                    placeholder="Enter Secret Id"
                    onChange={(event) =>
                        setClientSecret(event.currentTarget.value)
                    }
                />
            </FormControl>
            <Button
                onClick={() => {
                    showAuthPage(URL);
                    localStorage.setItem("CLIENT_ID", clientId);
                    localStorage.setItem("CLIENT_SECRET", clientSecret);
                }}
                size={SIZE.compact}
            >
                Authorize
            </Button>

            <Button
                onClick={() => getTokens()}
                style={{ marginLeft: "1rem" }}
                size={SIZE.compact}
            >
                Save
            </Button>
        </div>
    );
};

export default JiraAuth;
