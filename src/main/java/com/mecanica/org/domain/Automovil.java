package com.mecanica.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Automovil.
 */
@Entity
@Table(name = "automovil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Automovil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "placa")
    private String placa;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "color")
    private String color;

    @Column(name = "year")
    private Integer year;

    @Column(name = "nasientos")
    private Integer nasientos;

    @Column(name = "estadogeneralautomovil")
    private String estadogeneralautomovil;

    @Column(name = "numeromotor")
    private String numeromotor;

    @Column(name = "numerochasisgrabado")
    private String numerochasisgrabado;

    @OneToMany(mappedBy = "automovil")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Averia> averias = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "automovils", allowSetters = true)
    private TipoCombustible tipoCombustible;

    @ManyToOne
    @JsonIgnoreProperties(value = "automovils", allowSetters = true)
    private ClasificacionAutomovil clasificacionAutomovil;

    @ManyToOne
    @JsonIgnoreProperties(value = "automovils", allowSetters = true)
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties(value = "automovils", allowSetters = true)
    private Marca marca;

    @ManyToOne
    @JsonIgnoreProperties(value = "automovils", allowSetters = true)
    private TipoAutomovil tipoAutomovil;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public Automovil placa(String placa) {
        this.placa = placa;
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public Automovil modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getColor() {
        return color;
    }

    public Automovil color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getYear() {
        return year;
    }

    public Automovil year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getNasientos() {
        return nasientos;
    }

    public Automovil nasientos(Integer nasientos) {
        this.nasientos = nasientos;
        return this;
    }

    public void setNasientos(Integer nasientos) {
        this.nasientos = nasientos;
    }

    public String getEstadogeneralautomovil() {
        return estadogeneralautomovil;
    }

    public Automovil estadogeneralautomovil(String estadogeneralautomovil) {
        this.estadogeneralautomovil = estadogeneralautomovil;
        return this;
    }

    public void setEstadogeneralautomovil(String estadogeneralautomovil) {
        this.estadogeneralautomovil = estadogeneralautomovil;
    }

    public String getNumeromotor() {
        return numeromotor;
    }

    public Automovil numeromotor(String numeromotor) {
        this.numeromotor = numeromotor;
        return this;
    }

    public void setNumeromotor(String numeromotor) {
        this.numeromotor = numeromotor;
    }

    public String getNumerochasisgrabado() {
        return numerochasisgrabado;
    }

    public Automovil numerochasisgrabado(String numerochasisgrabado) {
        this.numerochasisgrabado = numerochasisgrabado;
        return this;
    }

    public void setNumerochasisgrabado(String numerochasisgrabado) {
        this.numerochasisgrabado = numerochasisgrabado;
    }

    public Set<Averia> getAverias() {
        return averias;
    }

    public Automovil averias(Set<Averia> averias) {
        this.averias = averias;
        return this;
    }

    public Automovil addAveria(Averia averia) {
        this.averias.add(averia);
        averia.setAutomovil(this);
        return this;
    }

    public Automovil removeAveria(Averia averia) {
        this.averias.remove(averia);
        averia.setAutomovil(null);
        return this;
    }

    public void setAverias(Set<Averia> averias) {
        this.averias = averias;
    }

    public TipoCombustible getTipoCombustible() {
        return tipoCombustible;
    }

    public Automovil tipoCombustible(TipoCombustible tipoCombustible) {
        this.tipoCombustible = tipoCombustible;
        return this;
    }

    public void setTipoCombustible(TipoCombustible tipoCombustible) {
        this.tipoCombustible = tipoCombustible;
    }

    public ClasificacionAutomovil getClasificacionAutomovil() {
        return clasificacionAutomovil;
    }

    public Automovil clasificacionAutomovil(ClasificacionAutomovil clasificacionAutomovil) {
        this.clasificacionAutomovil = clasificacionAutomovil;
        return this;
    }

    public void setClasificacionAutomovil(ClasificacionAutomovil clasificacionAutomovil) {
        this.clasificacionAutomovil = clasificacionAutomovil;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Automovil cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Marca getMarca() {
        return marca;
    }

    public Automovil marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public TipoAutomovil getTipoAutomovil() {
        return tipoAutomovil;
    }

    public Automovil tipoAutomovil(TipoAutomovil tipoAutomovil) {
        this.tipoAutomovil = tipoAutomovil;
        return this;
    }

    public void setTipoAutomovil(TipoAutomovil tipoAutomovil) {
        this.tipoAutomovil = tipoAutomovil;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Automovil)) {
            return false;
        }
        return id != null && id.equals(((Automovil) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Automovil{" +
            "id=" + getId() +
            ", placa='" + getPlaca() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", color='" + getColor() + "'" +
            ", year=" + getYear() +
            ", nasientos=" + getNasientos() +
            ", estadogeneralautomovil='" + getEstadogeneralautomovil() + "'" +
            ", numeromotor='" + getNumeromotor() + "'" +
            ", numerochasisgrabado='" + getNumerochasisgrabado() + "'" +
            "}";
    }
}
