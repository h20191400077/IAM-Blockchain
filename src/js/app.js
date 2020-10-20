App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
  //  await App.render()
  },

  loadWeb3: async () => {
    ethereum.autoRefreshOnNetworkChange = false;
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts
    console.log(App.account[0])
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const bits = await $.getJSON('BITS.json')
    App.contracts.BITS = TruffleContract(bits)
    App.contracts.BITS.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.bits = await App.contracts.BITS.deployed()
  },

  render: async () => {
    if (App.loading) {
      return
    }
    App.setLoading(true)
    $('#account').html(App.account)
    await App.renderTasks()
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const faculty_count = await App.bits.faculty_count()
    const $taskTemplate = $('.taskTemplate')


    for (var i = 1; i <= faculty_count; i++) {

      const task = await App.bits.faculties(i)
      const taskID = task[0].toNumber()
      const taskName = task[1]
      const taskAddr = task[2]
      const taskEmail = task[3]
      const taskPassword = task[4]
      const taskTelephone = task[5]
      const taskDepartment = task[6]
      const taskSubject = task[7]

     /* const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.name').html(taskName)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      

      $('taskList').append($newTaskTemplate)
      $newTaskTemplate.show()*/

    }
  },


  add_faculty: async () => {
    const name = $('#name').val()
    const addr = $('#addr').val()
    const email = $('#email').val()
    const password = $('#password').val()
    const telephone = $('#telephone').val()
    const department = $('#department').val()
    const subject = $('#subject').val()

    await App.bits.add_faculty(name, addr, email, password, telephone, department, subject)
    window.location.reload()
  }
  
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})