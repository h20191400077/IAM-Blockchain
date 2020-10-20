const BITS = artifacts.require("./BITS.sol");

contract('BITS', (accounts) => {
	before(async () => {
		this.bits = await BITS.deployed()
	})

	it('deploys successfully', async () => {
		const address = await this.bits.address
		assert.notEqual(address, 0x0)
		assert.notEqual(address, ' ')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})

	it('list users', async () => {
		const add_student = await this.bits.add_student()
		const student = await this.bits.student(add_student)
		assert.equal(student.id.toNumber(), add_student.toNumber())

	})



})
	
	