import java.awt.Container;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JScrollPane;

public class Reviuuer extends JFrame {
    



    public Reviuuer() {

        initUI();
    }

    private void initUI() {
        JButton Button = new JButton("Quit");

        Button.addActionListener((ActionEvent event) -> {
            System.exit(0);
        });


        createLayout(Button);

        setTitle("Reviuuer");
        setSize(300, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {
        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);
        //Jpanel container = new JPanel();
        JScrollBar scroll = new JScrollBar(pane);


        gl.setAutoCreateContainerGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );

        gl.setVerticalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -> {
            Reviuuer rev = new Reviuuer();
            rev.setVisible(true);
        });
    }
}