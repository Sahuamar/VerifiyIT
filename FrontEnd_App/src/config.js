export const SIMP_STORAGE_ADDRESS =
    '0x308610A8D6c1523Dcc5f04a5d7eA4125210aA171'
export const SIMP_STORAGE_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "petitions",
        "outputs": [
            {
                "name": "petitioner",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "votesReceived",
                "type": "uint8"
            },
            {
                "name": "added",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "authorities",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "a1",
                "type": "address"
            },
            {
                "name": "a2",
                "type": "address"
            },
            {
                "name": "a3",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_petitioner",
                "type": "address"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "submitPetition",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "viewPetitions",
        "outputs": [
            {
                "components": [
                    {
                        "name": "petitioner",
                        "type": "address"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "votesReceived",
                        "type": "uint8"
                    },
                    {
                        "name": "voters",
                        "type": "address[]"
                    },
                    {
                        "name": "added",
                        "type": "bool"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "petitioner",
                "type": "address"
            }
        ],
        "name": "removePetition",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_voter",
                "type": "address"
            },
            {
                "name": "_voters",
                "type": "address[]"
            }
        ],
        "name": "checkIfVoted",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_vacc",
                "type": "address"
            }
        ],
        "name": "checkIfVaccinationAuthority",
        "outputs": [
            {
                "name": "trust",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_id",
                "type": "string"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_gender",
                "type": "string"
            },
            {
                "name": "_nationality",
                "type": "string"
            },
            {
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            },
            {
                "name": "_vacName",
                "type": "string"
            },
            {
                "name": "_batchID",
                "type": "string"
            },
            {
                "name": "location",
                "type": "string"
            },
            {
                "name": "date",
                "type": "string"
            }
        ],
        "name": "addVaccination",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            }
        ],
        "name": "userExists",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            }
        ],
        "name": "calculateHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            }
        ],
        "name": "getVaccinationRecord",
        "outputs": [
            {
                "components": [
                    {
                        "name": "user_id",
                        "type": "string"
                    },
                    {
                        "name": "user_address",
                        "type": "address"
                    },
                    {
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "gender",
                        "type": "string"
                    },
                    {
                        "name": "createdBy",
                        "type": "address"
                    },
                    {
                        "name": "detailshash",
                        "type": "bytes32"
                    },
                    {
                        "components": [
                            {
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "name": "batch_id",
                                "type": "string"
                            },
                            {
                                "name": "addedBy",
                                "type": "address"
                            },
                            {
                                "name": "administrationDate",
                                "type": "string"
                            },
                            {
                                "name": "location",
                                "type": "string"
                            }
                        ],
                        "name": "vaccinations",
                        "type": "tuple[]"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            }
        ],
        "name": "getVaccinationHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "user_id",
                "type": "string"
            }
        ],
        "name": "getVaccinationRecordPublic",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getVaccinationAuthorities",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_add",
                "type": "address"
            }
        ],
        "name": "getAuthorityName",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]