import UserCard from '../../components/UserCard';

describe('<UserCard />', () => {
  const user = {
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/100?img=10',
    bio: 'Frontend Developer at Acme Corp',
  };

  it('renders all user info and triggers follow', () => {
    const onFollow = cy.stub().as('followHandler');

    cy.mount(<UserCard user={user} onFollow={onFollow} />);

    cy.get('img').should('have.attr', 'src', user.avatar);
    cy.contains(user.name);
    cy.contains(user.bio);
    cy.contains('Follow').click();
    cy.get('@followHandler').should('have.been.calledOnce');
  });
});
